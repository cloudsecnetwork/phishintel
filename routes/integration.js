import express from 'express';
import integrationController from '../controllers/integrationController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/ai/models', authMiddleware, integrationController.getAIModelsConfig);
router.get('/ai', authMiddleware, integrationController.getAIIntegration);
router.post('/ai/verify', authMiddleware, integrationController.verifyAIIntegration);
router.post('/ai', authMiddleware, integrationController.upsertAIIntegration);
router.post('/ai/disconnect', authMiddleware, integrationController.disconnectAIIntegration);

export default router;
