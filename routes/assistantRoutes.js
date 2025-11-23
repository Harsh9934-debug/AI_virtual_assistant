import express from 'express';
import { virtualAssistant, stopSpeaking, openApp, listCommands } from '../controllers/assistantController.js';

const router = express.Router();

router.post('/virtual-assistant', virtualAssistant);
router.post('/stop-speaking', stopSpeaking);
router.post('/open-app', openApp);

// Add this route
router.get('/commands', listCommands);

export default router;