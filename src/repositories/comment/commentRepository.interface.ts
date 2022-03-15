import { IComment } from '../../entity/comment';

export interface ICommentRepository{
    getComments():Promise<Array<IComment>>;
    createComment(comment:IComment):Promise<IComment>;
    getCommentsByUserId(userId:number):Promise<Array<IComment>>;
    deleteCommentByUserId(id:number):Promise<Object>;
    updateCommentById(id:number, text:string, like:number, dislike:number,
                      authorId:number, postId:number, title:string):Promise<Object>;
}
