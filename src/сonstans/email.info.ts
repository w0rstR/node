import { emailActionEnum } from './enums';

export const emailInfo = {
    [emailActionEnum.WELCOME]: {
        subject: 'Welcome, dear friend!',
        html: 'Hello! What`s up?',
    },

    [emailActionEnum.ACCOUNT_BLOCKED]: {
        subject: 'Attention!!!!',
        html: 'Your account was blocked',
    },
};
