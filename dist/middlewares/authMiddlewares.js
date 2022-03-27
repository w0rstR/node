"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddlewares = void 0;
const services_1 = require("../services");
const errorHendler_1 = require("../error/errorHendler");
class AuthMiddlewares {
    async checkAccessToken(req, res, next) {
        try {
            const accessToken = req.header('authorization')?.split(' ')[1];
            if (!accessToken) {
                next(new errorHendler_1.ErrorHendler('You not have token', 401));
                return;
            }
            const { userEmail } = services_1.tokenService.verifyToken(accessToken);
            const userFromToken = await services_1.userService.getUserByEmail(userEmail);
            if (!userFromToken) {
                next(new errorHendler_1.ErrorHendler('User not found!', 404));
                return;
            }
            req.user = userFromToken;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async checkRefreshToken(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const payloadFromToken = await services_1.tokenService.verifyToken(refreshToken, 'refresh');
            const userFromPayload = await services_1.userService.getUserByEmail(payloadFromToken.userEmail);
            const tokenFromDb = await services_1.tokenService.findRefreshToken(refreshToken);
            if (!payloadFromToken || !userFromPayload || !tokenFromDb) {
                next(new errorHendler_1.ErrorHendler('Wrong token', 401));
                return;
            }
            req.user = userFromPayload;
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.authMiddlewares = new AuthMiddlewares();
//# sourceMappingURL=authMiddlewares.js.map