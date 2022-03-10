import { IPost } from '../../entity/post';

export interface IPostRepository{
    getPosts(): Promise<Array<IPost>>;
}
