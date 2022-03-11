import { IComment } from '../../entity/comment';

export interface ICommentRepository{
    getComments():Promise<Array<IComment>>;
    createComment(comment:IComment):Promise<IComment>;
    getCommentsByUserId(userId:number):Promise<Array<IComment>>;
}
