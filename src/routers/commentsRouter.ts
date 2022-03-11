import { Router } from 'express';
import { commentController } from '../controller/commentController';

export const commentRouter = Router();

commentRouter.get('/', commentController.getComments);
commentRouter.post('/', commentController.createComment);
commentRouter.get('/:id', commentController.getCommentsByUserId);
