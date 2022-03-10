"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const userController_1 = require("../controller/userController");
exports.usersRouter = (0, express_1.Router)();
exports.usersRouter.get('/', userController_1.userController.getUsers);
exports.usersRouter.get('/:id', userController_1.userController.getUserById);
exports.usersRouter.post('/', userController_1.userController.createUser);
exports.usersRouter.put('/:id', userController_1.userController.updateUserById);
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
//# sourceMappingURL=usersRouter.js.map