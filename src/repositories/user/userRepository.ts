import {
    EntityRepository, getManager, Repository,
} from 'typeorm';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { IUser, User } from '../../entity/user';
import { IUserRepository } from './userRepository.interface';
import { IPaginationResponse } from '../../interfaces';

dayjs.extend(utc);

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

    public async updateUserPassword(id: number, password:string): Promise<object> {
        return getManager()
            .getRepository(User)
            .update({ id }, {
                password,
            });
    }

    public async getNewUsers():Promise<IUser[]> {
        return getManager().getRepository(User)
            .createQueryBuilder('user')
            .where('user.createdAt >= :date', { date: dayjs().utc().startOf('day').format() })
            .getMany();
    }

    public async getUserPagination(
        limit: number,
        page: number = 1,
        searchObject: Partial<IUser> = {},
    ): Promise<IPaginationResponse<IUser>> {
        const skip = limit * (page - 1);

        const [users, itemCount] = await getManager().getRepository(User)
            .findAndCount({ where: searchObject, skip, take: limit });

        return {
            page,
            perPage: limit,
            itemCount,
            data: users,
        };
    }
}

export const userRepository = new UserRepository();
