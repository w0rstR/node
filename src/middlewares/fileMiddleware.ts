import { NextFunction, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { IRequestExtended } from '../interfaces';
import { constans } from '../сonstans/constans';
import { ErrorHendler } from '../error/errorHendler';

class FileMiddleware {
    async checkUserAvatar(req:IRequestExtended, res:Response, next:NextFunction) {
        try {
            console.log('__________________________________');
            console.log(req.files);
            console.log('__________________________________');

            if (!req.files?.avatar) {
                next();
                return;
            }

            const { name, size, mimetype } = req.files.avatar as UploadedFile;

            if (size > constans.PHOTO_MAX_SIZE) {
                next(new ErrorHendler(`File ${name} is to big`));
                return;
            }

            if (!constans.PHOTOS_MIMETYPES.includes(mimetype)) {
                next(new ErrorHendler('Wrong file format'));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const fileMiddleware = new FileMiddleware();
