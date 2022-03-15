"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentService = void 0;
const commentRepository_1 = require("../repositories/comment/commentRepository");
class CommentService {
    async getComments() {
        return commentRepository_1.сommentRepository.getComments();
    }
    async createComment(comment) {
        return commentRepository_1.сommentRepository.createComment(comment);
    }
    async getCommentsByUserId(userId) {
        return commentRepository_1.сommentRepository.getCommentsByUserId(userId);
    }
    async deleteCommentByUserId(id) {
        return commentRepository_1.сommentRepository.deleteCommentByUserId(id);
    }
    async updateCommentById(id, text, like, dislike, authorId, postId, title) {
        return commentRepository_1.сommentRepository.updateCommentById(id, text, like, dislike, authorId, postId, title);
    }
}
exports.commentService = new CommentService();
//# sourceMappingURL=commentService.js.map