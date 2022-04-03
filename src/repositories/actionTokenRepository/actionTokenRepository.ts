import { EntityRepository, getManager, Repository } from 'typeorm';
import { ActionToken, IActionToken, IActionTokenForSave } from '../../entity/actionToken';
import { IActionTokenRepository } from './actionTokenRepository.interface';

@EntityRepository(ActionToken)
class ActionTokenRepository extends Repository<ActionToken> implements IActionTokenRepository {
    public async createActionToken(token: IActionTokenForSave): Promise<IActionToken> {
        return getManager()
            .getRepository(ActionToken)
            .save(token);
    }
}

export const actionTokenRepository = new ActionTokenRepository();
