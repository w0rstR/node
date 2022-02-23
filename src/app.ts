import express, { Request, Response } from 'express';
import { users } from './helper';

const arr = users;

console.log(arr);

const app = express();

app.get('/', (req:Request, res:Response) => {
    res.end();
});

app.listen(5500, () => {
    console.log('Server has started!!!');
});
