"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postController = void 0;
const postService_1 = require("../services/postService");
class PostController {
    async getPosts(req, res) {
        const posts = await postService_1.postService.getPosts();
        return res.json(posts);
    }
    async getPostByUserId(req, res) {
        const { userId } = req.params;
        const posts = await postService_1.postService.getPostByUserId(+userId);
        return res.json(posts);
    }
    async updatePostById(req, res) {
        const { title, text } = req.body;
        const { id } = req.params;
        const updatedPost = await postService_1.postService.updatePostById(+id, title, text);
        return res.json(updatedPost);
    }
    async deletePostById(req, res) {
        const { id } = req.params;
        const deletedPost = await postService_1.postService.deletePostById(+id);
        return res.json(deletedPost);
    }
    async createPost(req, res) {
        console.log(req.body);
        const createdPost = await postService_1.postService.createPost(req.body);
        return res.json(createdPost);
    }
}
exports.postController = new PostController();
//# sourceMappingURL=postController.js.map