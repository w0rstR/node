import { NextFunction, Response } from 'express';
import { tokenService } from '../services/tokenServices';
import { userService } from '../services/userServices';
import { IRequestExtended } from '../interfaces/requestExtendedInterface';

class AuthMiddlewares {
    public async checkAccessToken(req:IRequestExtended, res:Response, next:NextFunction) {
        try {
            const accessToken = req.header('authorization')?.split(' ')[1];
            console.log(accessToken);

            if (!accessToken) {
                throw new Error('You not have token');
            }

            const { userEmail } = tokenService.verifyToken(accessToken);
            const userFromToken = await userService.getUserByEmail(userEmail);

            if (!userFromToken) {
                throw new Error('Wrong token');
            }

            req.user = userFromToken;
            next();
        } catch (e: any) {
            res.json({ status: 400, message: e.message });
        }
    }
}

export const authMiddlewares = new AuthMiddlewares();
