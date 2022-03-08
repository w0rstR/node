"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const typeorm_1 = require("typeorm");
const user_1 = require("../entity/user");
const userController_1 = require("../controller/userController");
exports.usersRouter = (0, express_1.Router)();
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
exports.usersRouter.get('/', userController_1.userController.getUsers);
exports.usersRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const user = await (0, typeorm_1.getManager)()
        .getRepository(user_1.User)
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
exports.usersRouter.post('/', userController_1.userController.createUser);
exports.usersRouter.put('/:id', async (req, res) => {
    const { password, email } = req.body;
    const createdUser = await (0, typeorm_1.getManager)()
        .getRepository(user_1.User)
        .update({ id: Number(req.params.id) }, {
        password,
        email,
    });
    res.json(createdUser);
});
exports.usersRouter.delete('/users/:id', async (req, res) => {
    const deletedUser = await (0, typeorm_1.getManager)()
        .getRepository(user_1.User)
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
//# sourceMappingURL=usersRouter.js.map