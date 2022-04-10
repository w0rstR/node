import { IUser } from '../entity/user';
import { tokenService } from './tokenServices';
import { ITokenPayload } from '../interfaces';

class AuthServices {
    public async registaration(createdUser: IUser):Promise<ITokenPayload> {
        return this._getTokenData(createdUser);
    }

    private async _getTokenData(userData: IUser): Promise<ITokenPayload> {
        const { id, email } = userData;
        const tokenPair = await tokenService.generateTokenPair({ userId: id, userEmail: email });
        await tokenService.saveToken(id, tokenPair.refreshToken, tokenPair.accessToken);

        return {
            ...tokenPair,
            userId: id,
            userEmail: email,
        };
    }
}

export const authService = new AuthServices();
