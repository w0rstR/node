"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const tokenRepository_1 = require("../repositories/token/tokenRepository");
class TokenServices {
    async generateTokenPair(payload) {
        const accessToken = jsonwebtoken_1.default.sign(payload, config_1.config.SECRET_ACCESS_KEY, { expiresIn: '15m' });
        const refreshToken = jsonwebtoken_1.default.sign(payload, config_1.config.SECRET_REFRESH_KEY, { expiresIn: '1d' });
        return {
            accessToken,
            refreshToken,
        };
    }
    async saveToken(userId, refreshToken) {
        const tokenFromDb = await tokenRepository_1.tokenRepository.findTokenByUser(userId);
        if (tokenFromDb) {
            tokenFromDb.refreshToken = refreshToken;
            return tokenRepository_1.tokenRepository.createToken(tokenFromDb);
        }
        const token = await tokenRepository_1.tokenRepository.createToken({ refreshToken, userId });
        return token;
    }
}
exports.tokenService = new TokenServices();
//# sourceMappingURL=tokenServices.js.map