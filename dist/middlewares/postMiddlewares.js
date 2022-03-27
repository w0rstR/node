"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postMiddlewares = void 0;
const validators_1 = require("../validators");
const errorHendler_1 = require("../error/errorHendler");
class PostMiddlewares {
    async validatePost(req, res, next) {
        try {
            const { error, value } = validators_1.postValidators.post.validate(req.body);
            if (error) {
                next(new errorHendler_1.ErrorHendler(error.details[0].message, 404));
                return;
            }
            req.body = value;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async validateUpdatePost(req, res, next) {
        try {
            const { error, value } = validators_1.postValidators.updatePost.validate(req.body);
            if (error) {
                next(new errorHendler_1.ErrorHendler(error.details[0].message, 404));
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
                next(new errorHendler_1.ErrorHendler('Wrong id post!', 404));
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
exports.postMiddlewares = new PostMiddlewares();
//# sourceMappingURL=postMiddlewares.js.map