"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const authServices_1 = require("../services/authServices");
const tokenServices_1 = require("../services/tokenServices");
const userServices_1 = require("../services/userServices");
class AuthController {
    async registration(req, res) {
        const data = await authServices_1.authService.registaration(req.body);
        res.cookie('refreshToken', data.refreshToken, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true });
        return res.json(data);
    }
    async logout(req, res) {
        const { id } = req.user;
        res.clearCookie('refreshToken');
        console.log(res.get('accessToken'));
        await tokenServices_1.tokenService.deleteUserToken(id);
        return res.json('Ok');
    }
    async login(req, res) {
        const { email, password } = req.body;
        const userFromEmail = await userServices_1.userService.getUserByEmail(email);
        if (!userFromEmail) {
            throw new Error('This email not exists!');
        }
        const isPasswordCorrect = await bcrypt_1.default.compare(password, userFromEmail.password);
        if (!isPasswordCorrect) {
            throw new Error('This password is incorrect');
        }
        const tokenPair = await authServices_1.authService.login(userFromEmail);
        res.cookie('refreshToken', tokenPair.refreshToken, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true });
        console.log(tokenPair);
        res.json('oke');
    }
}
exports.authController = new AuthController();
//# sourceMappingURL=authController.js.map