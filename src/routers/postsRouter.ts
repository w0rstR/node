import { Router } from 'express';
import { postController } from '../controller/postController';

export const postRouter = Router();

postRouter.get('/', postController.getPosts);
postRouter.get('/:userId', postController.getPostByUserId);
postRouter.post('/', postController.createPost);
postRouter.put('/:id', postController.updatePostById);
postRouter.delete('/:id', postController.deletePostById);
