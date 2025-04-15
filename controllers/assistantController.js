import getResponse from "../services/llmService.js";
import { exec } from "child_process";
import axios from "axios";

let isSpeaking = false;

export const virtualAssistant = async (req, res) => {
    try {
        console.log("Received request body:", req.body);
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }

        // Prevent overlapping speech
        if (isSpeaking) {
            console.log("Speech is already in progress. Ignoring new request.");
            return res.status(400).json({ error: "Speech is already in progress" });
        }

        // Check if the prompt is a command to open Google
        if (prompt.toLowerCase().includes("open google")) {
            exec(`start https://www.google.com`, (error) => {
                if (error) {
                    console.error("Error opening Google:", error);
                    return res.status(500).json({ error: "Failed to open Google" });
                }
                console.log("Google opened successfully.");
                res.json({ response: "Opening Google..." });
            });
            return;
        }

        // Check if the prompt is a command to open YouTube
        if (prompt.toLowerCase().includes("open youtube")) {
            exec(`start https://www.youtube.com`, (error) => {
                if (error) {
                    console.error("Error opening YouTube:", error);
                    return res.status(500).json({ error: "Failed to open YouTube" });
                }
                console.log("YouTube opened successfully.");
                res.json({ response: "Opening YouTube..." });
            });
            return;
        }

        // Check if the prompt is a command to open WhatsApp
        if (prompt.toLowerCase().includes("open whatsapp")) {
            exec(`start whatsapp://`, (error) => {
                if (error) {
                    console.error("Error opening WhatsApp:", error);
                    return res.status(500).json({ error: "Failed to open WhatsApp" });
                }
                console.log("WhatsApp opened successfully.");
                res.json({ response: "Opening WhatsApp..." });
            });
            return;
        }

        // Check if the prompt is a command to open the camera
        if (prompt.toLowerCase().includes("open camera")) {
            // Windows: Open the default camera app
            exec(`start microsoft.windows.camera:`, (error) => {
                if (error) {
                    console.error("Error opening camera:", error);
                    return res.status(500).json({ error: "Failed to open the camera" });
                }
                console.log("Camera opened successfully.");
                res.json({ response: "Opening the camera..." });
            });
            return;
        }

        // Check if the prompt is a command to open a specific application
        if (prompt.toLowerCase().includes("open")) {
            const appPath = prompt.split("open ")[1].trim();
            exec(`start "" "${appPath}"`, (error) => {
                if (error) {
                    console.error("Error opening application:", error);
                    return res.status(500).json({ error: "Failed to open application" });
                }
                console.log("Application opened successfully.");
                res.json({ response: `Opening ${appPath}...` });
            });
            return;
        }

        // Check if the prompt is a command for today's news
        if (prompt.toLowerCase().includes("today's news")) {
            exec(`start https://news.google.com`, (error) => {
                if (error) {
                    console.error("Error opening Google News:", error);
                    return res.status(500).json({ error: "Failed to open Google News" });
                }
                console.log("Google News opened successfully.");
            });

            // Fetch top news headlines
            const newsResponse = await axios.get("https://newsapi.org/v2/top-headlines", {
                params: {
                    country: "us",
                    apiKey: process.env.NEWS_API_KEY,
                },
            });

            const headlines = newsResponse.data.articles
                .slice(0, 5)
                .map((article, index) => `${index + 1}. ${article.title}`)
                .join("\n");

            res.json({ response: `Here are today's top news headlines:\n${headlines}` });
            return;
        }

        // Handle other prompts using the Groq API
        const response = await getResponse(prompt);
        console.log("Sending response:", response.substring(0, 50) + "...");
        res.json({ response });

    } catch (error) {
        console.error("Controller Error:", error);
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

    exec(`start "" "${appPath}"`, (error) => {
        if (error) {
            console.error("Error opening application:", error);
            return res.status(500).json({ error: "Failed to open application" });
        }

        console.log("Application opened successfully.");
        res.json({ message: "Application opened successfully" });
    });
};