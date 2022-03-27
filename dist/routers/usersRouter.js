"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
const middlewares_1 = require("../middlewares");
exports.usersRouter = (0, express_1.Router)();
exports.usersRouter.get('/', controller_1.userController.getUsers);
exports.usersRouter.get('/:id', middlewares_1.userMiddlewares.validateId, controller_1.userController.getUserById);
exports.usersRouter.post('/', middlewares_1.userMiddlewares.validateCreateUser, controller_1.userController.createUser);
exports.usersRouter.put('/:id', middlewares_1.userMiddlewares.validateId, middlewares_1.userMiddlewares.validateUpdateUser, controller_1.userController.updateUserById);
//# sourceMappingURL=usersRouter.js.map