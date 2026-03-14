import express from 'express';
import userController from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Protected: All user routes
// /me routes must be defined before /:id so "me" is not captured as id
router.get('/me', authMiddleware, userController.getMe);
router.put('/me', authMiddleware, userController.updateMe);
router.post('/me/change-password', authMiddleware, userController.changePassword);

router.post('/', authMiddleware, userController.createUser);
router.get('/username/:username', authMiddleware, userController.getUserByUsername);
router.get('/email/:email', authMiddleware, userController.getUserByEmail);
router.put('/:id', authMiddleware, userController.updateUser);
router.delete('/:id', authMiddleware, userController.deleteUser);

export default router; 