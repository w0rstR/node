"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postService = void 0;
const postRepository_1 = require("../repositories/post/postRepository");
class PostService {
    async getPosts() {
        return postRepository_1.postRepository.getPosts();
    }
    async getPostByUserId(userId) {
        return postRepository_1.postRepository.getPostByUserId(userId);
    }
    async updatePostById(id, title, text) {
        return postRepository_1.postRepository.updatePostById(id, title, text);
    }
    async deletePostById(id) {
        return postRepository_1.postRepository.deletePostById(id);
    }
    async createPost(post) {
        return postRepository_1.postRepository.createPost(post);
    }
}
exports.postService = new PostService();
//# sourceMappingURL=postService.js.map