import { Request, Response } from 'express';
import { postService } from '../services/postService';
import { IPost } from '../entity/post';

class PostController {
    public async getPosts(req:Request, res:Response): Promise<Response<IPost>> {
        const posts = await postService.getPosts();
        return res.json(posts);
    }

    public async getPostByUserId(req:Request, res:Response):Promise<Response<IPost>> {
        const { userId } = req.params;
        const posts = await postService.getPostByUserId(+userId);
        return res.json(posts);
    }

    public async updatePostById(req:Request, res:Response):Promise<Response<Object>> {
        const { title, text } = req.body;
        const { id } = req.params;
        const updatedPost = await postService.updatePostById(+id, title, text);
        return res.json(updatedPost);
    }

    public async deletePostById(req:Request, res:Response):Promise<Response<Object>> {
        const { id } = req.params;
        const deletedPost = await postService.deletePostById(+id);
        return res.json(deletedPost);
    }

    public async createPost(req:Request, res:Response):Promise<Response<IPost>> {
        console.log(req.body);
        const createdPost = await postService.createPost(req.body);
        return res.json(createdPost);
    }
}

export const postController = new PostController();
