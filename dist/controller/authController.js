"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const services_1 = require("../services");
const errorHendler_1 = require("../error/errorHendler");
class AuthController {
    async registration(req, res) {
        const data = await services_1.authService.registaration(req.body);
        res.cookie('refreshToken', data.refreshToken, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true });
        return res.json(data);
    }
    async logout(req, res) {
        const { id } = req.user;
        res.clearCookie('refreshToken');
        await services_1.tokenService.deleteUserToken(id);
        return res.json('Logout is successfully completed');
    }
    async login(req, res, next) {
        const { email, id, password: hashPassword } = req.user;
        const { password } = req.body;
        const isCorectPassword = await services_1.userService.compareUserPassword(password, hashPassword);
        if (!isCorectPassword) {
            next(new errorHendler_1.ErrorHendler('User not found', 404));
            return;
        }
        const { accessToken, refreshToken } = await services_1.tokenService
            .generateTokenPair({ userId: id, userEmail: email });
        await services_1.tokenService.saveToken(id, refreshToken, accessToken);
        res.cookie('refreshToken', refreshToken, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true });
        res.json({
            accessToken,
            user: req.user,
        });
    }
    async refresh(req, res) {
        const { email, id } = req.user;
        const { refreshToken, accessToken } = await services_1.tokenService
            .generateTokenPair({ userId: id, userEmail: email });
        await services_1.tokenService.saveToken(id, refreshToken, accessToken);
        res.cookie('refreshToken', refreshToken, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true });
        return res.json({
            refreshToken,
            accessToken,
        });
    }
}
exports.authController = new AuthController();
//# sourceMappingURL=authController.js.map