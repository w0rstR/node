import { EntityRepository, getManager, Repository } from 'typeorm';
import { IPost, Post } from '../../entity/post';
import { IPostRepository } from './postRepository.interface';

@EntityRepository(Post)
class PostRepository extends Repository<Post> implements IPostRepository {
    public async getPosts():Promise<Array<IPost>> {
        return getManager().getRepository(Post).find();
    }

    public async getPostByUserId(userId:number):Promise<Array<IPost>> {
        return getManager()
            .getRepository(Post)
            .createQueryBuilder('post')
            .where('post.userId = :id', { id: +userId })
            .getMany();
    }

    public async updatePostById(id:number, title:string, text:string):Promise<Object> {
        return getManager()
            .getRepository(Post)
            .update({ id }, { title, text });
    }

    public async deletePostById(id:number):Promise<Object> {
        return getManager()
            .getRepository(Post)
            .delete({ id });
    }

    public async createPost(post:IPost):Promise<IPost> {
        return getManager()
            .getRepository(Post)
            .save(post);
    }
}

export const postRepository = new PostRepository();
