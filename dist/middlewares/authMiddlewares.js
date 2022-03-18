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
    async checkEmailExist(req, res, next) {
        try {
            const { email } = req.body;
            const userFromEmail = await services_1.userService.getUserByEmail(email);
            if (!userFromEmail) {
                throw new Error('This email not exists!');
            }
            next();
        }
        catch (e) {
            res.json({ status: 400, message: e.message });
        }
    }
}
exports.authMiddlewares = new AuthMiddlewares();
//# sourceMappingURL=authMiddlewares.js.map