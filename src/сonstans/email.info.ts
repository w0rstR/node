import { emailActionEnum } from './enums';

export const emailInfo = {
    [emailActionEnum.WELCOME]: {
        subject: 'Welcome, dear friend!',
        templateName: 'welcome',
    },

    [emailActionEnum.ACCOUNT_BLOCKED]: {
        subject: 'Attention!!!!',
        templateName: 'accountBlocked',
    },
};
