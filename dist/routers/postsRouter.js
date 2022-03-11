"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = require("express");
const postController_1 = require("../controller/postController");
exports.postRouter = (0, express_1.Router)();
exports.postRouter.get('/', postController_1.postController.getPosts);
exports.postRouter.get('/:userId', postController_1.postController.getPostByUserId);
exports.postRouter.post('/', postController_1.postController.createPost);
exports.postRouter.put('/:id', postController_1.postController.updatePostById);
exports.postRouter.delete('/:id', postController_1.postController.deletePostById);
//# sourceMappingURL=postsRouter.js.map