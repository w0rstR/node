"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postService = void 0;
const postRepository_1 = require("../repositories/post/postRepository");
class PostService {
    async getPosts() {
        return postRepository_1.postRepository.getPosts();
    }
}
exports.postService = new PostService();
//# sourceMappingURL=postService.js.map