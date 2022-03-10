import { postRepository } from '../repositories/post/postRepository';
import { IPost } from '../entity/post';

class PostService {
    public async getPosts():Promise<Array<IPost>> {
        return postRepository.getPosts();
    }
}

export const postService = new PostService();
