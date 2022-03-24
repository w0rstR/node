"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const middlewares_1 = require("../middlewares");
exports.usersRouter = (0, express_1.Router)();
exports.usersRouter.get('/', userController_1.userController.getUsers);
exports.usersRouter.get('/:id', userController_1.userController.getUserById);
exports.usersRouter.post('/', middlewares_1.userMiddlewares.validateCreateUser, userController_1.userController.createUser);
exports.usersRouter.put('/:id', userController_1.userController.updateUserById);
//# sourceMappingURL=usersRouter.js.map