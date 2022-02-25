import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { createConnection, getManager } from 'typeorm';
import { User } from './entity/user';

const app = express();

app.get('/users', async (req:Request, res:Response) => {
    const users = await getManager().getRepository(User).find();
    res.json(users);
});

app.listen(5500, async () => {
    try {
        const connection = await createConnection();
        if (connection) {
            console.log('Database connected');
        }
    } catch (e) {
        if (e) {
            console.log(e);
        }
    }

    console.log('Server has started!!!');
});
