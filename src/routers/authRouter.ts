import { Router } from 'express';
import { authController } from '../controller';
import { userMiddlewares, authMiddlewares } from '../middlewares';

const router = Router();

// router.post('/registration', userMiddlewares.checkEmailNotExist, authController.registration);
// router.post
// ('/login', celebrate(authValidator.login),
// userMiddlewares.checkEmailExist, authController.login);
// router.get('/logout', authMiddlewares.checkAccessToken, authController.logout);
// router.get('/refresh', authMiddlewares.checkRefreshToken, authController.refresh);

export const authRouter = router;

router.post('/registration', userMiddlewares.validateCreateUser, userMiddlewares.checkEmailNotExist, authController.registration);
router.post('/login', userMiddlewares.validateLoginUser, userMiddlewares.checkEmailExist, authController.login);
router.get('/logout', authMiddlewares.checkAccessToken, authController.logout);
router.get('/refresh', authMiddlewares.checkRefreshToken, authController.refresh);

router.post('/forgotPassword', authMiddlewares.checkValidEmail, userMiddlewares.checkEmailExist, authController.sendForgotPassword);
