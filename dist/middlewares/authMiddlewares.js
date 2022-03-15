"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddlewares = void 0;
const tokenServices_1 = require("../services/tokenServices");
const userServices_1 = require("../services/userServices");
class AuthMiddlewares {
    async checkAccessToken(req, res, next) {
        try {
            const accessToken = req.header('authorization')?.split(' ')[1];
            console.log(accessToken);
            if (!accessToken) {
                throw new Error('You not have token');
            }
            const { userEmail } = tokenServices_1.tokenService.verifyToken(accessToken);
            const userFromToken = await userServices_1.userService.getUserByEmail(userEmail);
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
}
exports.authMiddlewares = new AuthMiddlewares();
//# sourceMappingURL=authMiddlewares.js.map