import { ITokenDataToSave } from '../../interfaces';
import { IToken } from '../../entity/token';

export interface ITokenRepository{
    createToken(token: ITokenDataToSave): Promise<IToken>;
    findTokenByUser(userId: number): Promise<IToken | undefined>,
    deleteUserToken(userId: number | undefined): Promise<Object>
}
