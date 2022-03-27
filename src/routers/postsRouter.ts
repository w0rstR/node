import { Router } from 'express';
import { postController } from '../controller';
import { postMiddlewares } from '../middlewares';

export const postRouter = Router();

postRouter.get('/', postController.getPosts);
postRouter.get('/:userId', postMiddlewares.validateId, postController.getPostByUserId);
postRouter.post('/', postMiddlewares.validatePost, postController.createPost);
postRouter.put('/:id', postMiddlewares.validateId, postMiddlewares.validateUpdatePost, postController.updatePostById);
postRouter.delete('/:id', postMiddlewares.validateId, postController.deletePostById);
