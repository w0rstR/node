import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';
import cookieParser from 'cookie-parser';
import { routes } from './routers/apiRouters';

const app = express();

// @ts-ignore
global.rootDir = __dirname;

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(routes);

const { PORT } = process.env;

app.listen(PORT, async () => {
    try {
        const connection = await createConnection();
        if (connection) {
            console.log('Database connected');
        }
    } catch (e) {
        console.log(e);
    }
    console.log('Server has started!!!');
});
