import { EntityRepository, getManager, Repository } from 'typeorm';
import { IUser, User } from '../../entity/user';
import { IUserRepository } from './userRepository.interface';

@EntityRepository(User)
class UserRepository extends Repository<User> implements IUserRepository {
    public async createUser(user:IUser):Promise<IUser> {
        return getManager().getRepository(User).save(user);
    }

    public async getUserByEmail(email:string): Promise<IUser | undefined> {
        return getManager()
            .getRepository(User)
            .createQueryBuilder('user')
            .where('user.email = :email', { email })
            .andWhere('user.deletedAt IS NULL')
            .getOne();
    }

    public async getUsers(): Promise<Array<IUser | undefined>> {
        return getManager()
            .getRepository(User)
            .find({ relations: ['posts'] });
    }

    public async getUserById(id:number): Promise<IUser | undefined> {
        return getManager()
            .getRepository(User)
            .createQueryBuilder('user')
            .where('user.id = :id', { id })
            .getOne();
    }

    public async updateUserById(id:number, password:string, email:string): Promise<Object> {
        return getManager()
            .getRepository(User)
            .update({ id }, {
                password,
                email,
            });
    }

    public async updateUser(id: number, user: Partial<IUser>): Promise<object> {
        return getManager().getRepository(User).update({ id }, user);
    }
}

export const userRepository = new UserRepository();
