import { IActionToken } from '../../entity/actionToken';

export interface IActionTokenRepository{
    createActionToken(token: IActionToken): Promise<IActionToken>;
}
