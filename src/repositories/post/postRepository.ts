import { EntityRepository, getManager, Repository } from 'typeorm';
import { IPost, Post } from '../../entity/post';
import { IPostRepository } from './postRepository.interface';

@EntityRepository(Post)
class PostRepository extends Repository<Post> implements IPostRepository {
    public async getPosts():Promise<Array<IPost>> {
        return getManager().getRepository(Post).find();
    }
}

export const postRepository = new PostRepository();
