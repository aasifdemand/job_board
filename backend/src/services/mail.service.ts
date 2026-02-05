import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    private transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    async sendMail(to: string, subject: string, html: string) {
        await this.transporter.sendMail({
            from: `"Job Board" <${process.env.SMTP_USER}>`,
            to,
            subject,
            html,
        });
    }

    async sendVerificationEmail(email: string, token: string) {
        const link = `${process.env.FRONTEND_URL}/verify?token=${token}`;

        return this.sendMail(
            email,
            'Verify your account',
            `<p>Click to verify:</p><a href="${link}">${link}</a>`,
        );
    }

    async sendResetPasswordEmail(email: string, token: string) {
        const link = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

        return this.sendMail(
            email,
            'Reset your password',
            `<p>Reset password:</p><a href="${link}">${link}</a>`,
        );
    }
}
