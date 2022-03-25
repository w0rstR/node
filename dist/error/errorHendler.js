"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHendler = void 0;
class ErrorHendler extends Error {
    constructor(message, code = 400) {
        super(message);
        this.code = code;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.ErrorHendler = ErrorHendler;
//# sourceMappingURL=errorHendler.js.map