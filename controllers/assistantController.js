import getResponse from "../services/llmService.js";
import { CommandRegistry } from "../commands/CommandRegistry.js";
import logger from "../utils/logger.js";

let isSpeaking = false;
const commandRegistry = new CommandRegistry();

export const virtualAssistant = async (req, res) => {
    try {
        logger.info("Received request:", req.body);
        const { prompt } = req.body;

        if (!prompt) {
            logger.warning("Request missing prompt");
            return res.status(400).json({ error: "Prompt is required" });
        }

        // Prevent overlapping speech
        if (isSpeaking) {
            logger.warning("Speech already in progress");
            return res.status(400).json({ error: "Speech is already in progress" });
        }

        // Try to find and execute a matching command
        const commandExecuted = await commandRegistry.findAndExecute(prompt, res);
        
        if (commandExecuted) {
            return;
        }

        // If no command matched, use the LLM service
        logger.info("No command matched, using LLM service");
        const response = await getResponse(prompt);
        logger.success("LLM response generated");
        res.json({ response });

    } catch (error) {
        logger.error("Controller Error:", error.message);
        res.status(500).json({
            error: "Internal server error",
            details: error.message,
        });
    }
};

export const stopSpeaking = (req, res) => {
    res.json({ message: "Speech control handled by frontend" });
};

export const openApp = (req, res) => {
    const { appPath } = req.body;

    if (!appPath) {
        return res.status(400).json({ error: "Application path is required" });
    }

    const { exec } = require('child_process');
    const { getCommand } = require('../utils/platform.js');
    
    const command = getCommand(
        `open -a "${appPath}"`,
        `start "" "${appPath}"`
    );

    exec(command, (error) => {
        if (error) {
            console.error("Error opening application:", error);
            return res.status(500).json({ error: "Failed to open application" });
        }

        console.log("Application opened successfully.");
        res.json({ message: "Application opened successfully" });
    });
};

export const listCommands = (req, res) => {
    const commands = commandRegistry.listCommands();
    res.json({ commands });
};