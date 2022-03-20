"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddlewares = void 0;
const services_1 = require("../services");
class AuthMiddlewares {
    async checkAccessToken(req, res, next) {
        try {
            const accessToken = req.header('authorization')?.split(' ')[1];
            console.log(accessToken);
            if (!accessToken) {
                throw new Error('You not have token');
            }
            const { userEmail } = services_1.tokenService.verifyToken(accessToken);
            const userFromToken = await services_1.userService.getUserByEmail(userEmail);
            if (!userFromToken) {
                throw new Error('Wrong token');
            }
            req.user = userFromToken;
            next();
        }
        catch (e) {
            res.json({ status: 400, message: e.message });
        }
    }
    async checkRefreshToken(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const payloadFromToken = await services_1.tokenService.verifyToken(refreshToken, 'refresh');
            const userFromPayload = await services_1.userService.getUserByEmail(payloadFromToken.userEmail);
            const tokenFromDb = await services_1.tokenService.findRefreshToken(refreshToken);
            if (!payloadFromToken || !userFromPayload || !tokenFromDb) {
                throw new Error('Wrong token');
            }
            req.user = userFromPayload;
            next();
        }
        catch (e) {
            res.json({ status: 400, message: e.message });
        }
    }
}
exports.authMiddlewares = new AuthMiddlewares();
//# sourceMappingURL=authMiddlewares.js.map