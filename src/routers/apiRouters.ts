import { Router } from 'express';
import { usersRouter } from './usersRouter';
import { postsRouter } from './postsRouter';
import { commentsRouter } from './commentsRouter';
import { authRouter } from './authRouter';

export const routes = Router();

routes.use('/users', usersRouter);
routes.use('/posts', postsRouter);
routes.use('/comments', commentsRouter);
routes.use('/auth', authRouter);
