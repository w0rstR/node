"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postController = void 0;
const services_1 = require("../services");
class PostController {
    async getPosts(req, res) {
        const posts = await services_1.postService.getPosts();
        return res.json(posts);
    }
    async getPostByUserId(req, res) {
        const { userId } = req.params;
        const posts = await services_1.postService.getPostByUserId(+userId);
        return res.json(posts);
    }
    async updatePostById(req, res) {
        const { title, text } = req.body;
        const { id } = req.params;
        const updatedPost = await services_1.postService.updatePostById(+id, title, text);
        return res.json(updatedPost);
    }
    async deletePostById(req, res) {
        const { id } = req.params;
        const deletedPost = await services_1.postService.deletePostById(+id);
        return res.json(deletedPost);
    }
    async createPost(req, res) {
        console.log(req.body);
        const createdPost = await services_1.postService.createPost(req.body);
        return res.json(createdPost);
    }
}
exports.postController = new PostController();
//# sourceMappingURL=postController.js.map