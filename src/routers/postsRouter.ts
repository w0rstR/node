import { Request, Response, Router } from 'express';
import { getManager } from 'typeorm';
import { Post } from '../entity/post';
import { postController } from '../controller/postController';

export const postsRouter = Router();

postsRouter.get('/', postController.getPosts);
// postsRouter.get('/', async (req:Request, res:Response) => {
//     const posts = await getManager().getRepository(Post).find();
//     res.json(posts);
// });

postsRouter.get('/:userId', async (req: Request, res: Response) => {
    const { userId } = req.params;
    const user = await getManager().getRepository(Post)
        .createQueryBuilder('post')
        .where('post.userId = :id', { id: +userId })
        .getMany();
    res.json(user);
});

postsRouter.put('/posts/:userId', async (req:Request, res:Response) => {
    const { userId } = req.params;
    const { title, text } = req.body;

    const updatedPost = await getManager()
        .getRepository(Post)
        .update({ id: Number(userId) }, { title, text });
    res.json(updatedPost);
});
