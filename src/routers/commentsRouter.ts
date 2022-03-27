import { Router } from 'express';
import { commentController } from '../controller';
import { commentMiddlewares } from '../middlewares';

export const commentRouter = Router();

commentRouter.get('/', commentController.getComments);
commentRouter.post('/', commentMiddlewares.validateComment, commentController.createComment);
commentRouter.get('/:userId', commentMiddlewares.validateId, commentController.getCommentsByUserId);
commentRouter.delete('/:id', commentMiddlewares.validateId, commentController.deleteCommentByUserId);
commentRouter.put('/:id', commentMiddlewares.validateId, commentMiddlewares.validateComment, commentController.updateCommentById);
