"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddlewares = void 0;
const services_1 = require("../services");
const validators_1 = require("../validators");
const errorHendler_1 = require("../error/errorHendler");
class UserMiddlewares {
    async checkEmailExist(req, res, next) {
        try {
            const { email } = req.body;
            const userFromEmail = await services_1.userService.getUserByEmail(email);
            if (!userFromEmail) {
                next(new errorHendler_1.ErrorHendler('User not Found', 404));
                return;
            }
            req.user = userFromEmail;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async checkEmailNotExist(req, res, next) {
        try {
            const { email } = req.body;
            const userFromEmail = await services_1.userService.getUserByEmail(email);
            if (userFromEmail) {
                next(new errorHendler_1.ErrorHendler('User not Found', 404));
                return;
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async validateCreateUser(req, res, next) {
        try {
            const { error, value } = validators_1.userValidators.crateUser.validate(req.body);
            if (error) {
                next(new errorHendler_1.ErrorHendler(error.details[0].message, 404));
            }
            req.body = value;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async validateLoginUser(req, res, next) {
        try {
            const { error, value } = validators_1.userValidators.loginUser.validate(req.body);
            if (error) {
                next(new errorHendler_1.ErrorHendler('Wrong email or password!', 404));
                return;
            }
            req.body = value;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async validateId(req, res, next) {
        try {
            const { error, value } = validators_1.paramValidator.id.validate(req.params);
            if (error) {
                next(new errorHendler_1.ErrorHendler('Wrong id user!', 404));
                return;
            }
            req.body = value;
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.userMiddlewares = new UserMiddlewares();
//# sourceMappingURL=userMiddlewares.js.map