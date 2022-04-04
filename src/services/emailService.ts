import * as nodemailer from 'nodemailer';
import path from 'path';
import EmailTemplate from 'email-templates';
import { SentMessageInfo } from 'nodemailer';
import { config } from '../config/config';
import { emailActionEnum } from '../сonstans/enums';
import { emailInfo } from '../сonstans/email.info';
import { constans } from '../сonstans/constans';

class EmailService {
    async sendMail(userMail:string, action: emailActionEnum, context = {}):Promise<SentMessageInfo> {
        const { subject, templateName } = emailInfo[action];

        const templateRenderer = new EmailTemplate({
            views: {
                // @ts-ignore
                root: path.join(global.rootDir, 'email-templates'),
            },
        });

        Object.assign(context, { frontendUrl: constans.FRONTEND_URL });

        const html = await templateRenderer.render(templateName, context);

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
