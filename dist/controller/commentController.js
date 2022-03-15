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
        const { userId } = req.params;
        const comments = await commentService_1.commentService.getCommentsByUserId(+userId);
        return res.json(comments);
    }
    async deleteCommentByUserId(req, res) {
        const { id } = req.params;
        const deletedComment = await commentService_1.commentService.deleteCommentByUserId(+id);
        return res.json(deletedComment);
    }
    async updateCommentById(req, res) {
        const { id } = req.params;
        const { text, title, like, dislike, authorId, postId, } = req.body;
        const updatedComment = await commentService_1.commentService.updateCommentById(+id, text, like, dislike, authorId, postId, title);
        return res.json(updatedComment);
    }
}
exports.commentController = new CommentController();
//# sourceMappingURL=commentController.js.map