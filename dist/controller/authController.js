"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const services_1 = require("../services");
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
    async login(req, res) {
        const { email, password } = req.body;
        const tokenPair = await services_1.authService.login(email, password);
        return res.json(tokenPair);
    }
    async refresh(req, res) {
        const { refreshToken } = req.cookies;
        const payload = await services_1.authService.refresh(refreshToken);
        res.cookie('refreshToken', payload.refreshToken, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true });
        return res.json(payload);
    }
}
exports.authController = new AuthController();
//# sourceMappingURL=authController.js.map