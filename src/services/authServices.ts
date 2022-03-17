import { userService } from './userServices';
import { IUser } from '../entity/user';
import { tokenService } from './tokenServices';

class AuthServices {
    public async registaration(body: IUser) {
        const { email } = body;
        const userFromDb = await userService.getUserByEmail(email);
        if (userFromDb) {
            throw new Error(`User with email ${email} already exists`);
        }
        const createdUser = await userService.createUser(body);
        return this._getTokenData(createdUser);
    }

    public async login(body:IUser) {
        return this._getTokenData(body);
    }

    public async refresh(refreshToken:string) {
        const payloadFromToken = await tokenService.verifyToken(refreshToken, 'refresh');
        const userFromPayload = await userService.getUserByEmail(payloadFromToken.userEmail);

        if (!payloadFromToken || !userFromPayload) {
            throw new Error('This token is wrong!');
        }

        return this._getTokenData(userFromPayload);
    }

    private async _getTokenData(userData: IUser) {
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
