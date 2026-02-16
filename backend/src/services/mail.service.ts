import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    private readonly logger = new Logger(MailService.name);
    private transporter?: nodemailer.Transporter;

    constructor() {
        if (!process.env.SMTP_HOST) {
            this.logger.warn('SMTP not configured. Emails will be skipped.');
            return;
        }

        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: Number(process.env.SMTP_PORT) === 465,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        this.logger.log('Mail transporter initialized');
    }

    async sendMail(to: string, subject: string, html: string) {
        if (!this.transporter) {
            this.logger.warn(`Skipping email to ${to} (SMTP disabled)`);
            return;
        }

        try {
            this.logger.log(`Sending email to ${to}`);
            await this.transporter.sendMail({
                from: `"Job Board" <${process.env.SMTP_USER}>`,
                to,
                subject,
                html,
            });
            this.logger.log(`Email sent to ${to}`);
        } catch (error) {
            this.logger.error(
                `Failed to send email to ${to}`,
                error.stack,
            );
            throw error;
        }
    }

    async sendVerificationEmail(email: string, token: string, otp: string) {

        const html = `
        <h2>Verify Your Email Address</h2>
        <p>Thank you for registering! Please verify your email address:</p>
        <p style="font-size: 24px; font-weight: bold; letter-spacing: 4px;">${otp}</p>
        <p>Enter this code in the verification form.</p>
        
        <p style="color: #666; margin-top: 32px;">This verification link and OTP will expire in 10 minutes.</p>
        <p style="color: #666;">If you didn't create an account, you can safely ignore this email.</p>
    `;

        return this.sendMail(
            email,
            'Verify Your Email Address - Job Board', // Proper subject line
            html
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
