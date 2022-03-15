import { Router } from 'express';
import { userController } from '../controller/userController';

export const usersRouter = Router();

usersRouter.get('/', userController.getUsers);
usersRouter.get('/:id', userController.getUserById);
usersRouter.post('/', userController.createUser);
usersRouter.put('/:id', userController.updateUserById);
