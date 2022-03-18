import bcrypt from 'bcrypt';
import { userService } from './userServices';
import { IUser } from '../entity/user';
import { tokenService } from './tokenServices';
import { ITokenPayload } from '../interfaces';

class AuthServices {
    public async registaration(body: IUser):Promise<ITokenPayload> {
        const { email } = body;
        const userFromDb = await userService.getUserByEmail(email);
        if (userFromDb) {
            throw new Error(`User with email ${email} already exists`);
        }
        const createdUser = await userService.createUser(body);
        return this._getTokenData(createdUser);
    }

    public async login(email:string, password:string):Promise<ITokenPayload> {
        const userFromEmail = await userService.getUserByEmail(email);
        if (!userFromEmail) {
            throw new Error('This email not exists!');
        }
        const isPasswordCorrect = await bcrypt.compare(password, userFromEmail.password);
        if (!isPasswordCorrect) {
            throw new Error('This password is incorrect');
        }

        return this._getTokenData(userFromEmail);
    }

    public async refresh(refreshToken:string) :Promise<ITokenPayload> {
        const payloadFromToken = await tokenService.verifyToken(refreshToken, 'refresh');
        const userFromPayload = await userService.getUserByEmail(payloadFromToken.userEmail);

        if (!payloadFromToken || !userFromPayload) {
            throw new Error('This token is wrong!');
        }

        return this._getTokenData(userFromPayload);
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
