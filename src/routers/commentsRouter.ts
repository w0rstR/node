import { Request, Response, Router } from 'express';
import { getManager } from 'typeorm';
import { Comment } from '../entity/comment';

export const commentsRouter = Router();

commentsRouter.get('/', async (req: Request, res: Response) => {
    const comments = await getManager()
        .getRepository(Comment)
        .find();
    res.json(comments);
});

commentsRouter.post('/', async (req: Request, res: Response) => {
    const createdComment = await getManager()
        .getRepository(Comment)
        .save(req.body);
    res.json(createdComment);
});

commentsRouter.get('/:userId', async (req: Request, res: Response) => {
    const { userId } = req.params;
    const comments = await getManager()
        .getRepository(Comment)
        .createQueryBuilder('comment')
        .where('comment.authorId = :id', { id: +userId })
        .leftJoinAndSelect('comment.user', 'user')
        .leftJoinAndSelect('comment.post', 'post')
        .getMany();
    res.json(comments);
});
