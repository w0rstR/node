import dotenvf from 'dotenv';

dotenvf.config();

export const config = {
    PORT: process.env.port || 5500,
    SECRET_ACCESS_KEY: process.env.secret_access_key,
    SECRET_REFRESH_KEY: process.env.secret_refresh_key,
};
