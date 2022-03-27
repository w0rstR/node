import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interfaces';
import { paramValidator, postValidators } from '../validators';
import { ErrorHendler } from '../error/errorHendler';

class PostMiddlewares {
    public async validatePost(req:IRequestExtended, res:Response, next:NextFunction)
        :Promise<void> {
        try {
            const { error, value } = postValidators.post.validate(req.body);

            if (error) {
                next(new ErrorHendler(error.details[0].message, 404));
                return;
            }
            req.body = value;
            next();
        } catch (e:any) {
            next(e);
        }
    }

    public async validateUpdatePost(req:IRequestExtended, res:Response, next:NextFunction)
        :Promise<void> {
        try {
            const { error, value } = postValidators.updatePost.validate(req.body);

            if (error) {
                next(new ErrorHendler(error.details[0].message, 404));
                return;
            }
            req.body = value;
            next();
        } catch (e:any) {
            next(e);
        }
    }

    public async validateId(req:IRequestExtended, res:Response, next:NextFunction)
        :Promise<void> {
        try {
            const { error, value } = paramValidator.id.validate(req.params);

            if (error) {
                next(new ErrorHendler('Wrong id post!', 404));
                return;
            }
            req.body = value;
            next();
        } catch (e:any) {
            next(e);
        }
    }
}

export const postMiddlewares = new PostMiddlewares();
