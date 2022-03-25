"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonValidator = void 0;
const celebrate_1 = require("celebrate");
const regexp_1 = require("../../\u0441onstans/regexp");
exports.commonValidator = {
    emailValidator: celebrate_1.Joi.string().regex(regexp_1.regexp.EMAIL),
};
//# sourceMappingURL=commonValidator.js.map