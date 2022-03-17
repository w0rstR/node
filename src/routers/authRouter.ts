import { Router } from 'express';
import { authController } from '../controller/authController';
import { authMiddlewares } from '../middlewares/authMiddlewares';

const router = Router();

router.post('/registration', authController.registration);
router.post('/login', authController.login);
router.get('/logout', authMiddlewares.checkAccessToken, authController.logout);
router.get('/refresh', authController.refresh);

export const authRouter = router;
