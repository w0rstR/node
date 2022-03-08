import { Router } from 'express';
import { getManager } from 'typeorm';
import { User } from '../entity/user';
import { userController } from '../controller/userController';

export const usersRouter = Router();

// usersRouter.get('/', async (req, res) => {
//     const users = await getManager().getRepository(User).find({ relations: ['posts'] });
//     res.json(users);
//
//     // const users = await getManager().getRepository(User).find();
//     // res.json(users);
// });
// usersRouter.get('/', async (req, res) => {
//     const users = await getManager().getRepository(User).find({ relations: ['posts'] });
//     res.json(users);
// });

usersRouter.get('/', userController.getUsers);

usersRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const user = await getManager()
        .getRepository(User)
        .createQueryBuilder('user')
        .where('user.id = :id', { id: +id })
        .getMany();
    res.json(user);

    // const users = await getManager().getRepository(User).find();
    // res.json(users);
});

// usersRouter.post('/', async (req, res) => {
//     const createdUser = await getManager().getRepository(User).save(req.body);
//     res.json(createdUser);
// });

usersRouter.post('/', userController.createUser);

usersRouter.put('/:id', async (req, res) => {
    const { password, email } = req.body;
    const createdUser = await getManager()
        .getRepository(User)
        .update({ id: Number(req.params.id) }, {
            password,
            email,
        });
    res.json(createdUser);
});

usersRouter.delete('/users/:id', async (req, res) => {
    const deletedUser = await getManager()
        .getRepository(User)
        .delete({ id: Number(req.params.id) });
    res.json(deletedUser);
});

// app.delete('/users/:id', async (req, res) => {
//     console.log(req.body);
//     const deletedUser = await getManager()
//         .getRepository(User)
//         .softDelete({ id: Number(req.params.id) });
//     res.json(deletedUser);
// });
