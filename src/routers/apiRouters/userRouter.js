import { Router } from 'express';

import * as UserController from '../../controllers/userController.js';

// Initialize express router
const router = Router();

// POST login user
router.post('/login', UserController.login);

// POST logout user
router.post('/logout', UserController.logout);

// POST register user
router.post('/register', UserController.register);

// Export router
export default router;
