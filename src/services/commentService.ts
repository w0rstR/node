import { IComment } from '../entity/comment';
import { сommentRepository } from '../repositories/comment/commentRepository';

class CommentService {
    public async getComments():Promise<Array<IComment>> {
        return сommentRepository.getComments();
    }

    public async createComment(comment:IComment):Promise<IComment> {
        return сommentRepository.createComment(comment);
    }

    public async getCommentsByUserId(userId:number):Promise<Array<IComment>> {
        return сommentRepository.getCommentsByUserId(userId);
    }

    public async deleteCommentByUserId(id:number): Promise<Object> {
        return сommentRepository.deleteCommentByUserId(id);
    }

    public async updateCommentById(
        id:number,
        text:string,
        like:number,
        dislike:number,
        authorId:number,
        postId:number,
        title:string,
    ):Promise<Object> {
        return сommentRepository.updateCommentById(
            id,
            text,
            like,
            dislike,
            authorId,
            postId,
            title,
        );
    }
}

export const commentService = new CommentService();
