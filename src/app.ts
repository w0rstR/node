import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';
import { routes } from './routers/apiRouters';

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.use(routes);

app.listen(5500, async () => {
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
