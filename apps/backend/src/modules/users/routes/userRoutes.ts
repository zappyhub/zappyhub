import { Router } from 'express';
import { UserService } from '../services/UserService';
import { UserController } from '../controllers/UserController';

const router = Router();
const userService = new UserService();
const userController = new UserController(userService);

router.get('/', (req, res, next) => userController.listUsers(req, res, next));
router.get('/:id', (req, res, next) => userController.getUserById(req, res, next));
router.post('/', (req, res, next) => userController.createUser(req, res, next));
router.put('/:id', (req, res, next) => userController.updateUser(req, res, next));
router.delete('/:id', (req, res, next) => userController.deleteUser(req, res, next));

export default router;

