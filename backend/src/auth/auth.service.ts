import {
    BadRequestException,
    Injectable,
    Logger,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

import { User, UserRole } from 'src/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { MailService } from 'src/services/mail.service';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
        private jwtService: JwtService,
        private mailService: MailService,
    ) { }

    // ---------- REGISTER ----------
    async register(dto: RegisterDto) {
        this.logger.log(`Registration attempt for email: ${dto.email}`);

        const exists = await this.userRepo.findOne({
            where: { email: dto.email },
        });

        if (exists) {
            this.logger.warn(`Registration failed: Email ${dto.email} already in use`);
            throw new BadRequestException('Email already in use');
        }

        const verificationToken = crypto.randomUUID();
        this.logger.debug(`Generated verification token for ${dto.email}`);

        const user = this.userRepo.create({
            ...dto,
            password: await bcrypt.hash(dto.password, 10),
            verificationToken,
            isEmailVerified: false,
        });

        await this.userRepo.save(user);
        this.logger.log(`User created with ID: ${user.id}`);

        try {
            await this.mailService.sendVerificationEmail(user.email, verificationToken);
            this.logger.log(`Verification email sent to ${user.email}`);
        } catch (error) {
            this.logger.error(`Failed to send verification email to ${user.email}`, error.stack);
            // Don't throw here - user is already created, they can request a new email
        }

        this.logger.log(`Registration successful for user ID: ${user.id}`);
        return { message: 'Verify your email to continue' };
    }

    // ---------- LOGIN ----------
    async login(dto: LoginDto) {
        this.logger.log(`Login attempt for email: ${dto.email}`);

        const user = await this.userRepo.findOne({
            where: { email: dto.email },
        });

        if (!user) {
            this.logger.warn(`Login failed: User with email ${dto.email} not found`);
            throw new UnauthorizedException('Invalid credentials');
        }

        if (!user.password) {
            this.logger.warn(`Login failed: User ${user.id} has no password (possibly social login)`);
            throw new UnauthorizedException('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(dto.password, user.password);
        if (!isMatch) {
            this.logger.warn(`Login failed: Invalid password for user ${user.id}`);
            throw new UnauthorizedException('Invalid credentials');
        }

        if (!user.isEmailVerified) {
            this.logger.warn(`Login failed: Email not verified for user ${user.id}`);
            throw new UnauthorizedException('Email not verified');
        }

        this.logger.log(`Login successful for user ID: ${user.id}`);
        return this.signToken(user);
    }

    // ---------- GOOGLE LOGIN ----------
    async googleLogin(googleUser: {
        googleId: string;
        email: string;
        name: string;
    }) {
        this.logger.log(`Google login attempt for email: ${googleUser.email}`);

        let user = await this.userRepo.findOne({
            where: [{ googleId: googleUser.googleId }, { email: googleUser.email }],
        });

        if (!user) {
            this.logger.log(`Creating new user for Google ID: ${googleUser.googleId}`);
            user = this.userRepo.create({
                googleId: googleUser.googleId,
                email: googleUser.email,
                name: googleUser.name,
                role: UserRole.JOB_SEEKER,
                isEmailVerified: true,
            });

            await this.userRepo.save(user);
            this.logger.log(`New Google user created with ID: ${user.id}`);
        } else {
            this.logger.log(`Google login successful for existing user ID: ${user.id}`);
        }

        return this.signToken(user);
    }

    // ---------- FORGOT PASSWORD ----------
    async forgotPassword(email: string) {
        this.logger.log(`Forgot password request for email: ${email}`);

        const user = await this.userRepo.findOne({ where: { email } });

        if (!user) {
            this.logger.warn(`Forgot password: No user found with email ${email}`);
            return { message: 'If email exists, link sent' };
        }

        if (!user.password) {
            this.logger.warn(`Forgot password: User ${user.id} has no password (social login)`);
            return { message: 'If email exists, link sent' };
        }

        user.resetToken = crypto.randomUUID();
        user.resetTokenExpiresAt = new Date(Date.now() + 15 * 60 * 1000);

        await this.userRepo.save(user);
        this.logger.debug(`Reset token generated for user ${user.id}`);

        try {
            await this.mailService.sendResetPasswordEmail(
                user.email,
                user.resetToken,
            );
            this.logger.log(`Reset password email sent to ${user.email}`);
        } catch (error) {
            this.logger.error(`Failed to send reset password email to ${user.email}`, error.stack);
            throw new BadRequestException('Failed to send reset email');
        }

        return { message: 'Reset link sent' };
    }

    // ---------- RESET PASSWORD ----------
    async resetPassword(token: string, newPassword: string) {
        this.logger.log(`Password reset attempt with token: ${token.substring(0, 8)}...`);

        const user = await this.userRepo.findOne({
            where: { resetToken: token },
        });

        if (!user) {
            this.logger.warn(`Password reset failed: Invalid token ${token.substring(0, 8)}...`);
            throw new BadRequestException('Invalid or expired token');
        }

        if (!user.resetTokenExpiresAt || user.resetTokenExpiresAt < new Date()) {
            this.logger.warn(`Password reset failed: Expired token for user ${user.id}`);
            throw new BadRequestException('Invalid or expired token');
        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.resetToken = undefined;
        user.resetTokenExpiresAt = undefined;

        await this.userRepo.save(user);
        this.logger.log(`Password reset successful for user ID: ${user.id}`);

        return { message: 'Password reset successful' };
    }

    // ---------- VERIFY EMAIL ----------
    async verifyAccount(token: string) {
        this.logger.log(`Email verification attempt with token: ${token.substring(0, 8)}...`);

        const user = await this.userRepo.findOne({
            where: { verificationToken: token },
        });

        if (!user) {
            this.logger.warn(`Email verification failed: Invalid token ${token.substring(0, 8)}...`);
            throw new BadRequestException('Invalid token');
        }

        user.isEmailVerified = true;
        user.verificationToken = undefined;

        await this.userRepo.save(user);
        this.logger.log(`Email verified successfully for user ID: ${user.id}`);

        return { message: 'Account verified' };
    }

    // ---------- JWT ----------
    private signToken(user: User) {
        this.logger.debug(`Generating JWT token for user ID: ${user.id}`);

        const tokenData = {
            accessToken: this.jwtService.sign({
                sub: user.id,
                email: user.email,
                role: user.role,
            }),
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        };

        this.logger.debug(`JWT token generated for user ID: ${user.id}`);
        return tokenData;
    }
}