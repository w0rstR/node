import * as nodemailer from 'nodemailer';
import path from 'path';
import EmailTemplate from 'email-templates';
import { SentMessageInfo } from 'nodemailer';
import { config } from '../config/config';
import { emailActionEnum } from '../сonstans/enums';
import { emailInfo } from '../сonstans/email.info';

class EmailService {
    async sendMail(userMail:string, action: emailActionEnum, context = {}):Promise<SentMessageInfo> {
        const templateRenderer = new EmailTemplate({
            views: {
                // @ts-ignore
                root: path.join(global.rootDir, 'email-templates'),
            },
        });
        const { subject, templateName } = emailInfo[action];

        Object.assign(context, { frontendUrl: 'google.com' });

        const html = await templateRenderer.render(templateName, { userName: 'Nastya' });

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
