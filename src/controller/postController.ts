import { Request, Response } from 'express';
import { postService } from '../services/postService';
import { IPost } from '../entity/post';

class PostController {
    public async getPosts(req:Request, res:Response): Promise<Response<IPost>> {
        const posts = await postService.getPosts();
        return res.json(posts);
    }
}

export const postController = new PostController();
