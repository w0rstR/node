"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
const typeorm_1 = require("typeorm");
const post_1 = require("../entity/post");
const postController_1 = require("../controller/postController");
exports.postsRouter = (0, express_1.Router)();
exports.postsRouter.get('/', postController_1.postController.getPosts);
// postsRouter.get('/', async (req:Request, res:Response) => {
//     const posts = await getManager().getRepository(Post).find();
//     res.json(posts);
// });
exports.postsRouter.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    const user = await (0, typeorm_1.getManager)().getRepository(post_1.Post)
        .createQueryBuilder('post')
        .where('post.userId = :id', { id: +userId })
        .getMany();
    res.json(user);
});
exports.postsRouter.put('/posts/:userId', async (req, res) => {
    const { userId } = req.params;
    const { title, text } = req.body;
    const updatedPost = await (0, typeorm_1.getManager)()
        .getRepository(post_1.Post)
        .update({ id: Number(userId) }, { title, text });
    res.json(updatedPost);
});
//# sourceMappingURL=postsRouter.js.map