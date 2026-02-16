import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    Logger,
    NotFoundException,
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
import { JwtUser } from 'src/types/user.type';
import { JobSeekerProfile } from 'src/entities/seeker.entity';
import { Company } from 'src/entities/company.entity';

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

        // 1️⃣ Generate verification token (for link)
        const verificationToken = crypto.randomUUID();

        // 2️⃣ Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const user = this.userRepo.create({
            ...dto,
            password: await bcrypt.hash(dto.password, 10),
            verificationToken,
            emailVerificationOtp: otp,
            emailVerificationOtpExpiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 mins
            isEmailVerified: false,
        });

        await this.userRepo.save(user);

        this.logger.log(`User created with ID: ${user.id}`);

        try {
            await this.mailService.sendVerificationEmail(
                user.email,
                verificationToken,
                otp
            );

            this.logger.log(`Verification email sent to ${user.email}`);
        } catch (error) {
            this.logger.error(
                `Failed to send verification email to ${user.email}`,
                error.stack,
            );
        }

        return {
            message: 'Verification link and OTP sent to your email',
        };
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
                isOnboarded: false,
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
    async verifyAccount(email: string, otp: string) {
        const user = await this.userRepo.findOne({
            where: { email },
        });

        if (!user) {
            throw new BadRequestException('User not found');
        }

        if (user.isEmailVerified) {
            return { message: 'Account already verified' };
        }

        if (!user.emailVerificationOtp || user.emailVerificationOtp !== otp) {
            throw new BadRequestException('Invalid OTP');
        }

        if (
            !user.emailVerificationOtpExpiresAt ||
            user.emailVerificationOtpExpiresAt < new Date()
        ) {
            throw new BadRequestException('OTP expired');
        }

        user.isEmailVerified = true;
        user.emailVerificationOtp = undefined;
        user.emailVerificationOtpExpiresAt = undefined;

        await this.userRepo.save(user);

        return { message: 'Account verified successfully' };
    }



    // ---------- JWT ----------
    private signToken(user: User) {
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
            name: user.name,
            isOnboarded: user.isOnboarded, // ✅ ADD THIS
        };

        return {
            accessToken: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                isOnboarded: user.isOnboarded, // ✅ ADD THIS
            },
        };
    }



    async selectRole(role: UserRole, authUser: JwtUser) {
        const user = await this.userRepo.findOne({
            where: { id: authUser.userId },
        });

        if (!user) throw new NotFoundException('User not found');

        if (user.role) {
            throw new ForbiddenException('Role already selected');
        }

        user.role = role;
        await this.userRepo.save(user);

        return { message: 'Role selected successfully' };
    }


    async findOne(id: string) {
        return this.userRepo.findOne({
            where: { id },
            relations: [JobSeekerProfile.name, Company.name]
        });
    }


}