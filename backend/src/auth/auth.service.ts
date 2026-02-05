import {
    BadRequestException,
    Injectable,
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
    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
        private jwtService: JwtService,
        private mailService: MailService,
    ) { }

    // ---------- REGISTER ----------
    async register(dto: RegisterDto) {
        const exists = await this.userRepo.findOne({
            where: { email: dto.email },
        });

        if (exists) throw new BadRequestException('Email already in use');

        const verificationToken = crypto.randomUUID();

        const user = this.userRepo.create({
            ...dto,
            password: await bcrypt.hash(dto.password, 10),
            verificationToken,
            isEmailVerified: false,
        });

        await this.userRepo.save(user);
        await this.mailService.sendVerificationEmail(user.email, verificationToken);

        return { message: 'Verify your email to continue' };
    }

    // ---------- LOGIN ----------
    async login(dto: LoginDto) {
        const user = await this.userRepo.findOne({
            where: { email: dto.email },
        });

        if (!user || !user.password)
            throw new UnauthorizedException('Invalid credentials');

        const isMatch = await bcrypt.compare(dto.password, user.password);
        if (!isMatch) throw new UnauthorizedException('Invalid credentials');

        if (!user.isEmailVerified)
            throw new UnauthorizedException('Email not verified');

        return this.signToken(user);
    }

    // ---------- GOOGLE LOGIN ----------
    async googleLogin(googleUser: {
        googleId: string;
        email: string;
        name: string;
    }) {
        let user = await this.userRepo.findOne({
            where: [{ googleId: googleUser.googleId }, { email: googleUser.email }],
        });

        if (!user) {
            user = this.userRepo.create({
                googleId: googleUser.googleId,
                email: googleUser.email,
                name: googleUser.name,
                role: UserRole.JOB_SEEKER,
                isEmailVerified: true,
            });

            await this.userRepo.save(user);
        }

        return this.signToken(user);
    }

    // ---------- FORGOT PASSWORD ----------
    async forgotPassword(email: string) {
        const user = await this.userRepo.findOne({ where: { email } });
        if (!user || !user.password) return { message: 'If email exists, link sent' };

        user.resetToken = crypto.randomUUID();
        user.resetTokenExpiresAt = new Date(Date.now() + 15 * 60 * 1000);

        await this.userRepo.save(user);
        await this.mailService.sendResetPasswordEmail(
            user.email,
            user.resetToken,
        );

        return { message: 'Reset link sent' };
    }

    // ---------- RESET PASSWORD ----------
    async resetPassword(token: string, newPassword: string) {
        const user = await this.userRepo.findOne({
            where: { resetToken: token },
        });

        if (
            !user ||
            !user.resetTokenExpiresAt ||
            user.resetTokenExpiresAt < new Date()
        ) {
            throw new BadRequestException('Invalid or expired token');
        }

        user.password = await bcrypt.hash(newPassword, 10);

        // ✅ use undefined, not null
        user.resetToken = undefined;
        user.resetTokenExpiresAt = undefined;

        await this.userRepo.save(user);

        return { message: 'Password reset successful' };
    }


    // ---------- VERIFY EMAIL ----------
    async verifyAccount(token: string) {
        const user = await this.userRepo.findOne({
            where: { verificationToken: token },
        });

        if (!user) throw new BadRequestException('Invalid token');

        user.isEmailVerified = true;
        user.verificationToken = undefined;


        await this.userRepo.save(user);
        return { message: 'Account verified' };
    }

    // ---------- JWT ----------
    private signToken(user: User) {
        return {
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
    }
}
