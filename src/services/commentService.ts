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
}

export const commentService = new CommentService();
