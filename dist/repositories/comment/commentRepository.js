"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.сommentRepository = void 0;
const typeorm_1 = require("typeorm");
const comment_1 = require("../../entity/comment");
let CommentRepository = class CommentRepository extends typeorm_1.Repository {
    async getComments() {
        return (0, typeorm_1.getManager)()
            .getRepository(comment_1.Comment)
            .find();
    }
    async createComment(comment) {
        return (0, typeorm_1.getManager)()
            .getRepository(comment_1.Comment)
            .save(comment);
    }
    async getCommentsByUserId(userId) {
        return (0, typeorm_1.getManager)()
            .getRepository(comment_1.Comment)
            .createQueryBuilder('comment')
            .where('comment.authorId = :id', { id: +userId })
            .leftJoinAndSelect('comment.user', 'user')
            .leftJoinAndSelect('comment.post', 'post')
            .getMany();
    }
    async deleteCommentByUserId(id) {
        return (0, typeorm_1.getManager)()
            .getRepository(comment_1.Comment)
            .delete({ id });
    }
    async updateCommentById(id, text, like, dislike, authorId, postId, title) {
        return (0, typeorm_1.getManager)()
            .getRepository(comment_1.Comment)
            .update({ id }, {
            text, like, dislike, authorId, postId, title,
        });
    }
};
CommentRepository = __decorate([
    (0, typeorm_1.EntityRepository)(comment_1.Comment)
], CommentRepository);
exports.сommentRepository = new CommentRepository();
//# sourceMappingURL=commentRepository.js.map