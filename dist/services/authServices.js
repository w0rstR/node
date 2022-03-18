"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userServices_1 = require("./userServices");
const tokenServices_1 = require("./tokenServices");
class AuthServices {
    async registaration(body) {
        const { email } = body;
        const userFromDb = await userServices_1.userService.getUserByEmail(email);
        if (userFromDb) {
            throw new Error(`User with email ${email} already exists`);
        }
        const createdUser = await userServices_1.userService.createUser(body);
        return this._getTokenData(createdUser);
    }
    async login(email, password) {
        const userFromEmail = await userServices_1.userService.getUserByEmail(email);
        if (!userFromEmail) {
            throw new Error('This email not exists!');
        }
        const isPasswordCorrect = await bcrypt_1.default.compare(password, userFromEmail.password);
        if (!isPasswordCorrect) {
            throw new Error('This password is incorrect');
        }
        return this._getTokenData(userFromEmail);
    }
    async refresh(refreshToken) {
        const payloadFromToken = await tokenServices_1.tokenService.verifyToken(refreshToken, 'refresh');
        const userFromPayload = await userServices_1.userService.getUserByEmail(payloadFromToken.userEmail);
        if (!payloadFromToken || !userFromPayload) {
            throw new Error('This token is wrong!');
        }
        return this._getTokenData(userFromPayload);
    }
    async _getTokenData(userData) {
        const { id, email } = userData;
        const tokenPair = await tokenServices_1.tokenService.generateTokenPair({ userId: id, userEmail: email });
        await tokenServices_1.tokenService.saveToken(id, tokenPair.refreshToken, tokenPair.accessToken);
        return {
            ...tokenPair,
            userId: id,
            userEmail: email,
        };
    }
}
exports.authService = new AuthServices();
//# sourceMappingURL=authServices.js.map