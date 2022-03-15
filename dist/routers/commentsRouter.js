"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRouter = void 0;
const express_1 = require("express");
const commentController_1 = require("../controller/commentController");
exports.commentRouter = (0, express_1.Router)();
exports.commentRouter.get('/', commentController_1.commentController.getComments);
exports.commentRouter.post('/', commentController_1.commentController.createComment);
exports.commentRouter.get('/:userId', commentController_1.commentController.getCommentsByUserId);
exports.commentRouter.delete('/:id', commentController_1.commentController.deleteCommentByUserId);
exports.commentRouter.put('/:id', commentController_1.commentController.updateCommentById);
//# sourceMappingURL=commentsRouter.js.map