import express from "express";
import { virtualAssistant, stopSpeaking } from "../controllers/assistantController.js";

const router = express.Router();

router.post("/virtualAssistant", virtualAssistant);
router.post("/stopSpeaking", stopSpeaking);

export default router;