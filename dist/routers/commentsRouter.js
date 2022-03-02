"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentsRouter = void 0;
const express_1 = require("express");
const typeorm_1 = require("typeorm");
const comment_1 = require("../entity/comment");
exports.commentsRouter = (0, express_1.Router)();
exports.commentsRouter.get('/', async (req, res) => {
    const comments = await (0, typeorm_1.getManager)()
        .getRepository(comment_1.Comment)
        .find();
    res.json(comments);
});
exports.commentsRouter.post('/', async (req, res) => {
    const createdComment = await (0, typeorm_1.getManager)()
        .getRepository(comment_1.Comment)
        .save(req.body);
    res.json(createdComment);
});
exports.commentsRouter.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    const comments = await (0, typeorm_1.getManager)()
        .getRepository(comment_1.Comment)
        .createQueryBuilder('comment')
        .where('comment.authorId = :id', { id: +userId })
        .leftJoinAndSelect('comment.user', 'user')
        .leftJoinAndSelect('comment.post', 'post')
        .getMany();
    res.json(comments);
});
//# sourceMappingURL=commentsRouter.js.map