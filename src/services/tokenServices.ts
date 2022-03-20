import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { IToken } from '../entity/token';
import { tokenRepository } from '../repositories/token/tokenRepository';
import { IUserPayload } from '../interfaces/tokenInterfaces';

class TokenServices {
    public async generateTokenPair(payload:any):
        Promise<{accessToken:string, refreshToken:string}> {
        const accessToken = jwt.sign(payload, config.SECRET_ACCESS_KEY as string, { expiresIn: '150m' });
        const refreshToken = jwt.sign(payload, config.SECRET_REFRESH_KEY as string, { expiresIn: '1d' });

        return {
            accessToken,
            refreshToken,
        };
    }

    public async saveToken(
        userId:number,
        refreshToken: string,
        accessToken:string,
    ):Promise<IToken> {
        const tokenFromDb = await tokenRepository.findTokenByUser(userId);
        if (tokenFromDb) {
            tokenFromDb.refreshToken = refreshToken;
            tokenFromDb.accessToken = accessToken;
            return tokenRepository.createToken(tokenFromDb);
        }

        const token = await tokenRepository.createToken({ refreshToken, userId, accessToken });
        return token;
    }

    public async deleteUserToken(userId: number | undefined):Promise<Object> {
        return tokenRepository.deleteUserToken(userId);
    }

    public async findRefreshToken(refreshToken:string):Promise<IToken |undefined> {
        return tokenRepository.findRefreshToken(refreshToken);
    }

    public verifyToken(token:string, tokenType:string = 'access'):IUserPayload {
        let secretWord = config.SECRET_ACCESS_KEY;

        if (tokenType === 'refresh') {
            secretWord = config.SECRET_REFRESH_KEY;
        }
        return jwt.verify(token, secretWord as string) as IUserPayload;
    }
}

export const tokenService = new TokenServices();
