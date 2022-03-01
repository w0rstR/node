import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { createConnection, getManager } from 'typeorm';
import { User } from './entity/user';
import { Post } from './entity/post';
import { Comment } from './entity/comment';

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.get('/users', async (req:Request, res:Response) => {
    // const users = await getManager().getRepository(User).find();
    // res.json(users);

    const users = await getManager().getRepository(User).find({ relations: ['posts'] });
    res.json(users);

    // const users = await getManager()
    //     .getRepository(User)
    //     .createQueryBuilder('user')
    //     .leftJoin('Posts', 'posts', 'posts.userId = user.id')
    //     .where('posts.text = "test"')
    //     .getMany();
    // res.json(users);
});

app.post('/users', async (req, res) => {
    const createdUser = await getManager().getRepository(User).save(req.body);
    res.json(createdUser);
});

app.put('/users/:id', async (req, res) => {
    const { password, email } = req.body;
    const createdUser = await getManager()
        .getRepository(User)
        .update({ id: Number(req.params.id) }, {
            password,
            email,
        });
    res.json(createdUser);
});

app.post('/users', async (req, res) => {
    const createdUser = await getManager().getRepository(User).save(req.body);
    res.json(createdUser);
});

app.delete('/users/:id', async (req, res) => {
    console.log(req.body);
    const deletedUser = await getManager()
        .getRepository(User)
        .delete({ id: Number(req.params.id) });
    res.json(deletedUser);
});

// app.delete('/users/:id', async (req, res) => {
//     console.log(req.body);
//     const deletedUser = await getManager()
//         .getRepository(User)
//         .softDelete({ id: Number(req.params.id) });
//     res.json(deletedUser);
// });

app.get('/posts', async (req:Request, res:Response) => {
    const posts = await getManager().getRepository(Post).find();
    res.json(posts);
});

app.get('/posts/:userId', async (req: Request, res: Response) => {
    const { userId } = req.params;
    const user = await getManager().getRepository(Post)
        .createQueryBuilder('post')
        .where('post.userId = :id', { id: +userId })
        .getMany();
    res.json(user);
});

app.put('/posts/:userId', async (req:Request, res:Response) => {
    const { userId } = req.params;
    const { title, text } = req.body;

    const updatedPost = await getManager()
        .getRepository(Post)
        .update({ id: Number(userId) }, { title, text });
    res.json(updatedPost);
});

app.get('/comments', async (req: Request, res: Response) => {
    const comments = await getManager()
        .getRepository(Comment)
        .find();
    res.json(comments);
});

app.post('/comments', async (req: Request, res: Response) => {
    const createdComment = await getManager()
        .getRepository(Comment)
        .save(req.body);
    res.json(createdComment);
});

// app.get('/comments/:userId', async (req: Request, res: Response) => {
//     const { userId } = req.params;
//     const comments = await getManager()
//         .getRepository(Comment)
//         .createQueryBuilder('comment')
//         .where('comment.id = :id', { id: +userId })
//         .getMany();
//     res.json(comments);
// });

app.get('/comments/:userId', async (req: Request, res: Response) => {
    const { userId } = req.params;
    const comments = await getManager()
        .getRepository(Comment)
        .createQueryBuilder('comment')
        .where('comment.authorId = :id', { id: +userId })
        .getMany();
    res.json(comments);
});

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
