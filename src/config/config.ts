import dotenvf from 'dotenv';

dotenvf.config();

export const config = {
    PORT: process.env.port || 5500,
    SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY || '123',
    SECRET_REFRESH_KEY: process.env.SECRET_REFRESH_KEY || '456',
    SECRET_ACTION_KEY: process.env.SECRET_ACTION_KEY || 'qwe',

    NO_REPLAY_EMAIL: process.env.NO_REPLAY_EMAIL,
    NO_REPLAY_EMAIL_PASSWORD: process.env.NO_REPLAY_EMAIL_PASSWORD,

    S3_NAME: process.env.S3_NAME,
    S3_REGION: process.env.S3_REGION,
    S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
    S3_SECRET_KEY: process.env.S3_SECRET_KEY,
};
