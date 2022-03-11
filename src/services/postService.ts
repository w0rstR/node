import { postRepository } from '../repositories/post/postRepository';
import { IPost } from '../entity/post';

class PostService {
    public async getPosts():Promise<Array<IPost>> {
        return postRepository.getPosts();
    }

    public async getPostByUserId(userId:number):Promise<Array<IPost>> {
        return postRepository.getPostByUserId(userId);
    }

    public async updatePostById(id:number, title:string, text:string):Promise<Object> {
        return postRepository.updatePostById(id, title, text);
    }

    public async deletePostById(id:number):Promise<Object> {
        return postRepository.deletePostById(id);
    }

    public async createPost(post:IPost):Promise<IPost> {
        return postRepository.createPost(post);
    }
}

export const postService = new PostService();
