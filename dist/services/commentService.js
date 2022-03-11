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
}
exports.commentService = new CommentService();
//# sourceMappingURL=commentService.js.map