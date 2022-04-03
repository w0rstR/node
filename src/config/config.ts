import dotenvf from 'dotenv';

dotenvf.config();

export const config = {
    PORT: process.env.port || 5500,
    SECRET_ACCESS_KEY: process.env.secret_access_key || '123',
    SECRET_REFRESH_KEY: process.env.secret_refresh_key || '456',
    SECRET_ACTION_KEY: process.env.secret_action_key || 'qwe',

    NO_REPLAY_EMAIL: process.env.NO_REPLAY_EMAIL,
    NO_REPLAY_EMAIL_PASSWORD: process.env.NO_REPLAY_EMAIL_PASSWORD,
};
