import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { createConnection, getManager } from 'typeorm';
import { User } from './entity/user';

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.get('/users', async (req:Request, res:Response) => {
    // const users = await getManager().getRepository(User).find();
    // res.json(users);
    const users = await getManager().getRepository(User)
        .createQueryBuilder('user')
        .where('user.firstName = "Alex"')
        .getMany();
    res.json(users);
});

app.post('/users', async (req, res) => {
    try {
        const createdUser = await getManager().getRepository(User).save(req.body);
        console.log(createdUser);
        res.status(201).json(createdUser);
    } catch (e) {
        console.log(e);
    }
});

app.put('/users/:id', async (req, res) => {
    const { password, email } = req.body;
    // const {id} = req.params;
    const createdUser = await getManager()
        .getRepository(User)
        .update({ id: Number(req.body.id) }, {
            password,
            email,
        });
    res.json(createdUser);
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
