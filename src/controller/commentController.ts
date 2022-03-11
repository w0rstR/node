import { Request, Response } from 'express';
import { IComment } from '../entity/comment';
import { commentService } from '../services/commentService';

class CommentController {
    public async getComments(req:Request, res:Response):Promise<Response<IComment>> {
        const comments = await commentService.getComments();
        return res.json(comments);
    }

    public async createComment(req:Request, res:Response):Promise<Response<IComment>> {
        const createdComment = await commentService.createComment(req.body);
        return res.json(createdComment);
    }

    public async getCommentsByUserId(req:Request, res:Response):Promise<Response<IComment>> {
        const { id } = req.params;
        const comments = await commentService.getCommentsByUserId(+id);
        return res.json(comments);
    }
}

export const commentController = new CommentController();
