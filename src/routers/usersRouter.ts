import { Router } from 'express';
import { userController } from '../controller/userController';
import { userMiddlewares } from '../middlewares';

export const usersRouter = Router();

usersRouter.get('/', userController.getUsers);
usersRouter.get('/:id', userController.getUserById);
usersRouter.post('/', userMiddlewares.validateCreateUser, userController.createUser);
usersRouter.put('/:id', userController.updateUserById);
