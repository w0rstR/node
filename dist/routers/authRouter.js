"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
// router.post('/registration', userMiddlewares.checkEmailNotExist, authController.registration);
// router.post
// ('/login', celebrate(authValidator.login),
// userMiddlewares.checkEmailExist, authController.login);
// router.get('/logout', authMiddlewares.checkAccessToken, authController.logout);
// router.get('/refresh', authMiddlewares.checkRefreshToken, authController.refresh);
exports.authRouter = router;
router.post('/registration', middlewares_1.userMiddlewares.validateCreateUser, middlewares_1.userMiddlewares.checkEmailNotExist, controller_1.authController.registration);
router.post('/login', middlewares_1.userMiddlewares.validateLoginUser, middlewares_1.userMiddlewares.checkEmailExist, controller_1.authController.login);
router.get('/logout', middlewares_1.authMiddlewares.checkAccessToken, controller_1.authController.logout);
router.get('/refresh', middlewares_1.authMiddlewares.checkRefreshToken, controller_1.authController.refresh);
//# sourceMappingURL=authRouter.js.map