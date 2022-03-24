"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddlewares = void 0;
const services_1 = require("../services");
const validators_1 = require("../validators");
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
    async validateCreateUser(req, res, next) {
        try {
            const { error, value } = validators_1.userValidators.crateUser.validate(req.body);
            if (error) {
                throw new Error(error.details[0].message);
            }
            req.body = value;
            next();
        }
        catch (e) {
            res.status(400).json(e.message);
        }
    }
    async validateLoginUser(req, res, next) {
        try {
            const { error, value } = validators_1.userValidators.loginUser.validate(req.body);
            if (error) {
                throw new Error('Wrong email or password!');
            }
            req.body = value;
            next();
        }
        catch (e) {
            res.status(400).json(e.message);
        }
    }
    async validateId(req, res, next) {
        try {
            const { error, value } = validators_1.paramValidator.id.validate(req.params);
            if (error) {
                throw new Error('Wrong id user!');
            }
            req.body = value;
            next();
        }
        catch (e) {
            res.status(400).json(e.message);
        }
    }
}
exports.userMiddlewares = new UserMiddlewares();
//# sourceMappingURL=userMiddlewares.js.map