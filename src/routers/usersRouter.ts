import { Router } from 'express';
import { userController } from '../controller';
import { userMiddlewares } from '../middlewares';

export const usersRouter = Router();

// usersRouter.get('/', userController.getUsers);
usersRouter.get('/:id', userMiddlewares.validateId, userController.getUserById);
usersRouter.post('/', userMiddlewares.validateCreateUser, userController.createUser);
usersRouter.put('/:id', userMiddlewares.validateId, userMiddlewares.validateUpdateUser, userController.updateUserById);
usersRouter.get('/', userController.getUserPagination);
