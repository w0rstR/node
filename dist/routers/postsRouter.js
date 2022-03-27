"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
const middlewares_1 = require("../middlewares");
exports.postRouter = (0, express_1.Router)();
exports.postRouter.get('/', controller_1.postController.getPosts);
exports.postRouter.get('/:userId', middlewares_1.postMiddlewares.validateId, controller_1.postController.getPostByUserId);
exports.postRouter.post('/', middlewares_1.postMiddlewares.validatePost, controller_1.postController.createPost);
exports.postRouter.put('/:id', middlewares_1.postMiddlewares.validateId, middlewares_1.postMiddlewares.validateUpdatePost, controller_1.postController.updatePostById);
exports.postRouter.delete('/:id', middlewares_1.postMiddlewares.validateId, controller_1.postController.deletePostById);
//# sourceMappingURL=postsRouter.js.map