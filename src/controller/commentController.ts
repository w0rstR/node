import { Request, Response } from 'express';
import { IComment } from '../entity/comment';
import { commentService } from '../services';

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
        const { userId } = req.params;
        const comments = await commentService.getCommentsByUserId(+userId);
        return res.json(comments);
    }

    public async deleteCommentByUserId(req:Request, res:Response):Promise<Response<Object>> {
        const { id } = req.params;
        const deletedComment = await commentService.deleteCommentByUserId(+id);
        return res.json(deletedComment);
    }

    public async updateCommentById(req:Request, res:Response):Promise<Response<Object>> {
        const { id } = req.params;
        const {
            text, title, like, dislike, authorId, postId,
        } = req.body;
        const updatedComment = await commentService.updateCommentById(
            +id,
            text,
            like,
            dislike,
            authorId,
            postId,
            title,
        );
        return res.json(updatedComment);
    }
}

export const commentController = new CommentController();
