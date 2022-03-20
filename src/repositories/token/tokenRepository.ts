import { EntityRepository, getManager, Repository } from 'typeorm';
import { ITokenRepository } from './tokenRepository.interface';
import { IToken, Token } from '../../entity/token';

@EntityRepository(Token)
class TokenRepository extends Repository<Token> implements ITokenRepository {
    public async createToken(token:any):Promise<IToken> {
        return getManager()
            .getRepository(Token)
            .save(token);
    }

    public async findTokenByUser(userId:number):Promise<IToken | undefined> {
        return getManager().getRepository(Token).findOne({ userId });
    }

    public async deleteUserToken(userId: number | undefined):Promise<Object> {
        return getManager().getRepository(Token).delete({ userId });
    }

    public async findRefreshToken(refreshToken:string):Promise<IToken | undefined> {
        return getManager().getRepository(Token).findOne({ refreshToken });
    }
}

export const tokenRepository = new TokenRepository();
