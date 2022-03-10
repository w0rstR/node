import { Router } from 'express';
import { userController } from '../controller/userController';

export const usersRouter = Router();

usersRouter.get('/', userController.getUsers);
usersRouter.get('/:id', userController.getUserById);
usersRouter.post('/', userController.createUser);
usersRouter.put('/:id', userController.updateUserById);

// usersRouter.delete('/:id', async (req, res) => {
//     console.log(req.params);
//     const deletedUser = await getManager()
//         .getRepository(User)
//         .delete({ id: Number(req.params.id) });
//     res.json(deletedUser);
// });

// app.delete('/users/:id', async (req, res) => {
//     console.log(req.body);
//     const deletedUser = await getManager()
//         .getRepository(User)
//         .softDelete({ id: Number(req.params.id) });
//     res.json(deletedUser);
// });
