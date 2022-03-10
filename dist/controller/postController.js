"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postController = void 0;
const postService_1 = require("../services/postService");
class PostController {
    async getPosts(req, res) {
        const posts = await postService_1.postService.getPosts();
        return res.json(posts);
    }
}
exports.postController = new PostController();
//# sourceMappingURL=postController.js.map