"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const authController_1 = require("../controller/authController");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
// router.post('/registration', userMiddlewares.checkEmailNotExist, authController.registration);
// router.post('/login', celebrate(authValidator.login), userMiddlewares.checkEmailExist, authController.login);
// router.get('/logout', authMiddlewares.checkAccessToken, authController.logout);
// router.get('/refresh', authMiddlewares.checkRefreshToken, authController.refresh);
exports.authRouter = router;
router.post('/registration', middlewares_1.userMiddlewares.checkEmailNotExist, authController_1.authController.registration);
router.post('/login', middlewares_1.userMiddlewares.validateLoginUser, middlewares_1.userMiddlewares.checkEmailExist, authController_1.authController.login);
router.get('/logout', middlewares_1.authMiddlewares.checkAccessToken, authController_1.authController.logout);
router.get('/refresh', middlewares_1.authMiddlewares.checkRefreshToken, authController_1.authController.refresh);
//# sourceMappingURL=authRouter.js.map