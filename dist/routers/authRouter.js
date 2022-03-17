"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const authController_1 = require("../controller/authController");
const authMiddlewares_1 = require("../middlewares/authMiddlewares");
const router = (0, express_1.Router)();
router.post('/registration', authController_1.authController.registration);
router.post('/login', authController_1.authController.login);
router.get('/logout', authMiddlewares_1.authMiddlewares.checkAccessToken, authController_1.authController.logout);
router.get('/refresh', authController_1.authController.refresh);
exports.authRouter = router;
//# sourceMappingURL=authRouter.js.map