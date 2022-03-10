"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    PORT: process.env.port || 5500,
    SECRET_ACCESS_KEY: process.env.secret_access_key,
    SECRET_REFRESH_KEY: process.env.secret_refresh_key,
};
//# sourceMappingURL=config.js.map