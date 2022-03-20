"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddlewares = void 0;
const services_1 = require("../services");
class UserMiddlewares {
    async checkEmailExist(req, res, next) {
        try {
            const { email } = req.body;
            const userFromEmail = await services_1.userService.getUserByEmail(email);
            if (!userFromEmail) {
                res.status(404).json('User not found!');
                return;
            }
            req.user = userFromEmail;
            next();
        }
        catch (e) {
            res.json({ status: 400, message: e.message });
        }
    }
    async checkEmailNotExist(req, res, next) {
        try {
            const { email } = req.body;
            const userFromEmail = await services_1.userService.getUserByEmail(email);
            if (userFromEmail) {
                res.status(404).json('This email is already exists!');
                return;
            }
            next();
        }
        catch (e) {
            res.json({ status: 400, message: e.message });
        }
    }
}
exports.userMiddlewares = new UserMiddlewares();
//# sourceMappingURL=userMiddlewares.js.map