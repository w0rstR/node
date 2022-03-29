import * as nodemailer from 'nodemailer';
import { config } from '../config/config';
import { emailActionEnum } from '../сonstans/enums';
import { emailInfo } from '../сonstans/email.info';

class EmailService {
    sendMail(userMail:string, action: emailActionEnum) {
        const { subject, html } = emailInfo[action];

        const emailTransporter = nodemailer.createTransport({
            from: 'Test',
            to: userMail,
            service: 'gmail',
            auth: {
                user: config.NO_REPLAY_EMAIL,
                pass: config.NO_REPLAY_EMAIL_PASSWORD,
            },
        });

        return emailTransporter.sendMail({
            to: userMail,
            subject,
            html,
        });
    }
}

export const emailService = new EmailService();
