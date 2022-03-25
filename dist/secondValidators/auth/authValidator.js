"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidator = void 0;
const celebrate_1 = require("celebrate");
const commonValidator_1 = require("../\u0441ommon/commonValidator");
exports.authValidator = {
    login: {
        [celebrate_1.Segments.BODY]: celebrate_1.Joi.object({
            email: commonValidator_1.commonValidator.emailValidator,
            password: celebrate_1.Joi.string().required().min(8),
        }),
    },
};
//# sourceMappingURL=authValidator.js.map