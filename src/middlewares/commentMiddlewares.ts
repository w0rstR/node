import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interfaces';
import { paramValidator, commentValidator } from '../validators';
import { ErrorHendler } from '../error/errorHendler';

class CommentMiddlewares {
    public async validateComment(req:IRequestExtended, res:Response, next:NextFunction)
        :Promise<void> {
        try {
            const { error, value } = commentValidator.comment.validate(req.body);

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
                next(new ErrorHendler('Wrong id сomment!', 404));
                return;
            }
            req.body = value;
            next();
        } catch (e:any) {
            next(e);
        }
    }
}

export const commentMiddlewares = new CommentMiddlewares();
