import { Router } from 'express';
import { AuthService } from '../services/AuthService';
import { AuthController } from '../controllers/AuthController';
import { authLimiter } from '../../../middlewares/rateLimit';

const router = Router();
const authService = new AuthService();
const controller = new AuthController(authService);

router.post('/register', authLimiter, (req, res, next) => controller.register(req, res, next));
router.post('/login', authLimiter, (req, res, next) => controller.login(req, res, next));
router.post('/refresh', authLimiter, (req, res, next) => controller.refresh(req, res, next));

export default router;

