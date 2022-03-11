import { IPost } from '../../entity/post';

export interface IPostRepository{
    getPosts(): Promise<Array<IPost>>;
    createPost(post:IPost):Promise<IPost>;
    getPostByUserId(userId:number):Promise<Array<IPost>>;
    updatePostById(id:number, title:string, text:string):Promise<Object>
    deletePostById(id:number):Promise<Object>;
}
