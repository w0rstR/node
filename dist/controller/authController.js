"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const authServices_1 = require("../services/authServices");
class AuthController {
    async registration(req, res) {
        const data = await authServices_1.authService.registaration(req.body);
        res.cookie('refreshToken', data.refreshToken, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true });
        return res.json(data);
    }
}
exports.authController = new AuthController();
//# sourceMappingURL=authController.js.map