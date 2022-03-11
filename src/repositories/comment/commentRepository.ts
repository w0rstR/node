import { EntityRepository, getManager, Repository } from 'typeorm';
import { Comment, IComment } from '../../entity/comment';
import { ICommentRepository } from './commentRepository.interface';

@EntityRepository(Comment)
class CommentRepository extends Repository<Comment> implements ICommentRepository {
    public async getComments():Promise<Array<IComment>> {
        return getManager()
            .getRepository(Comment)
            .find();
    }

    public async createComment(comment:IComment):Promise<IComment> {
        return getManager()
            .getRepository(Comment)
            .save(comment);
    }

    public async getCommentsByUserId(userId:number):Promise<Array<IComment>> {
        return getManager()
            .getRepository(Comment)
            .createQueryBuilder('comment')
            .where('comment.authorId = :id', { id: +userId })
            .leftJoinAndSelect('comment.user', 'user')
            .leftJoinAndSelect('comment.post', 'post')
            .getMany();
    }
}

export const сommentRepository = new CommentRepository();
