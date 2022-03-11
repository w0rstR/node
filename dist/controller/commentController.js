"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentController = void 0;
const commentService_1 = require("../services/commentService");
class CommentController {
    async getComments(req, res) {
        const comments = await commentService_1.commentService.getComments();
        return res.json(comments);
    }
    async createComment(req, res) {
        const createdComment = await commentService_1.commentService.createComment(req.body);
        return res.json(createdComment);
    }
    async getCommentsByUserId(req, res) {
        const { id } = req.params;
        const comments = await commentService_1.commentService.getCommentsByUserId(+id);
        return res.json(comments);
    }
}
exports.commentController = new CommentController();
//# sourceMappingURL=commentController.js.map