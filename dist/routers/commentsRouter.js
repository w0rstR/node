"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
const middlewares_1 = require("../middlewares");
exports.commentRouter = (0, express_1.Router)();
exports.commentRouter.get('/', controller_1.commentController.getComments);
exports.commentRouter.post('/', middlewares_1.commentMiddlewares.validateComment, controller_1.commentController.createComment);
exports.commentRouter.get('/:userId', middlewares_1.commentMiddlewares.validateId, controller_1.commentController.getCommentsByUserId);
exports.commentRouter.delete('/:id', middlewares_1.commentMiddlewares.validateId, controller_1.commentController.deleteCommentByUserId);
exports.commentRouter.put('/:id', middlewares_1.commentMiddlewares.validateId, middlewares_1.commentMiddlewares.validateComment, controller_1.commentController.updateCommentById);
//# sourceMappingURL=commentsRouter.js.map