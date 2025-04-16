import getResponse from "../services/llmService.js";
import { exec } from "child_process";
import axios from "axios";
import open from "open";

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

        //for microsoft store 
        if (prompt.toLowerCase().includes("open microsoft store")) {
            exec(`start microsoft store://`, (error) => {
                if (error) {
                    console.error("Error opening microsoft store :", error);
                    return res.status(500).json({ error: "Failed to open microsoft store " });
                }
                console.log("microsoft store  opened successfully.");
                res.json({ response: "Opening microsoft store..." });
            });
            return;
        }

        // if the prompt is to open vs code
        if (prompt.toLowerCase().includes("open vs code")) {
            exec(`start code`, (error) => {
                if (error) {
                    console.error("Error opening vs code:", error);
                    return res.status(500).json({ error: "Failed to open microsoft store " });
                }
                console.log("vs code  opened successfully.");
                res.json({ response: "Opening vs code ..." });
            });
            return;
        }


         // Check if the prompt is a command to open BRAVE
        if (prompt.toLowerCase().includes("open brave")) {
            exec(`start brave`, (error) => {
                if (error) {
                    console.error("Error details:", error);
                    return res.status(500).json({ error: "Failed to open Brave", details: error.message });
                }
                console.log("Brave opened successfully.");
                res.json({ response: "Opening Brave..." });
            });
            return;
        }

        //check if th prompt is to open spotify 
        if (prompt.toLowerCase().includes("open spotify")) {
            exec(`start spotify://`, (error) => {
                if (error) {
                    console.error("Error opening spotify :", error);
                    return res.status(500).json({ error: "Failed to open spotify" });
                }
                console.log("spotify  opened successfully.");
                res.json({ response: "Opening spotify..." });
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

        // Check if the prompt is a command to open the calculator
        if (prompt.toLowerCase().includes("open calculator")) {
            exec(`start calc`, (error) => {
                if (error) {
                    console.error("Error opening calculator:", error);
                    return res.status(500).json({ error: "Failed to open calculator" });
                }
                console.log("Calculator opened successfully.");
                res.json({ response: "Opening calculator..." });
            });
            return;
        }

        // Check if the prompt is a command to open the clock
        if (prompt.toLowerCase().includes("open clock")) {
            exec(`start ms-clock:`, (error) => {
                if (error) {
                    console.error("Error opening clock:", error);
                    return res.status(500).json({ error: "Failed to open clock" });
                }
                console.log("Clock opened successfully.");
                res.json({ response: "Opening clock..." });
            });
            return;
        }

        // Check if the prompt is a command to open the calendar
        if (prompt.toLowerCase().includes("open calendar")) {
            exec(`start outlookcal:`, (error) => {
                if (error) {
                    console.error("Error opening calendar with outlookcal:", error);
                    // If the first command fails, try the second one
                    exec(`start ms-calendar:`, (error) => {
                        if (error) {
                            console.error("Error opening calendar with ms-calendar:", error);
                            return res.status(500).json({ error: "Failed to open calendar" });
                        }
                        console.log("Calendar opened successfully with ms-calendar.");
                        res.json({ response: "Opening calendar..." });
                    });
                    return;
                }
                console.log("Calendar opened successfully with outlookcal.");
                res.json({ response: "Opening calendar..." });
            });
            return;
        }

        // Check if the prompt is a command to open the file explorer

        if (prompt.toLowerCase().includes("open file explorer")) {
            console.log("Opening file explorer...");
            exec(`start explorer`, (error) => {
                if (error) {
                    console.error("Error details:", error);
                    return res.status(500).json({ error: "Failed to open file explorer", details: error.message });
                }
                console.log("File explorer opened successfully.");
                res.json({ response: "Opening file explorer..." });
            });
            return;
        }

        // Check if the prompt is a command to open the task manager

        if (prompt.toLowerCase().includes("open task manager")) {
            exec(`start taskmgr`, (error) => {
                if (error) {
                    console.error("Error opening task manager:", error);
                    return res.status(500).json({ error: "Failed to open task manager" });
                }
                console.log("Task manager opened successfully.");
                res.json({ response: "Opening task manager..." });
            });
            return;
        }

        // Check if the prompt is a command to open the settings
        if (prompt.toLowerCase().includes("open settings")) {
            exec(`start ms-settings:`, (error) => {
                if (error) {
                    console.error("Error opening settings:", error);
                    return res.status(500).json({ error: "Failed to open settings" });
                }
                console.log("Settings opened successfully.");
                res.json({ response: "Opening settings..." });
            });
            return;
        }

        // Function to adjust brightness dynamically
        const adjustBrightness = (level, res) => {
            exec(`powershell.exe -command "(Get-WmiObject -Namespace root/wmi -Class WmiMonitorBrightnessMethods).WmiSetBrightness(1, ${level})"`, (error) => {
                if (error) {
                    console.error(`Error adjusting brightness to ${level}%:`, error);
                    return res.status(500).json({ error: `Failed to adjust brightness to ${level}%` });
                }
                console.log(`Brightness adjusted to ${level}% successfully.`);
                res.json({ response: `Brightness adjusted to ${level}% successfully.` });
            });
        };

        // Function to get the current brightness level
        const getCurrentBrightness = () => {
            return new Promise((resolve, reject) => {
                exec(`powershell.exe -command "(Get-WmiObject -Namespace root/wmi -Class WmiMonitorBrightness).CurrentBrightness"`, (error, stdout) => {
                    if (error) {
                        return reject(error);
                    }
                    const currentBrightness = parseInt(stdout.trim(), 10);
                    resolve(currentBrightness);
                });
            });
        };

        // Function to set the brightness level
        const setBrightness = (level, res) => {
            exec(`powershell.exe -command "(Get-WmiObject -Namespace root/wmi -Class WmiMonitorBrightnessMethods).WmiSetBrightness(1, ${level})"`, (error) => {
                if (error) {
                    console.error(`Error setting brightness to ${level}%:`, error);
                    return res.status(500).json({ error: `Failed to set brightness to ${level}%` });
                }
                console.log(`Brightness set to ${level}% successfully.`);
                res.json({ response: `Brightness set to ${level}% successfully.` });
            });
        };

        // Check if the prompt is to adjust brightness
        if (prompt.toLowerCase().includes("brightness")) {
            const match = prompt.match(/(increase|decrease) brightness (to|by)? (\d+|full)/i);
            if (match) {
                const action = match[1].toLowerCase(); // "increase" or "decrease"
                const value = match[3].toLowerCase(); // Brightness value or "full"

                let adjustmentValue = 100; // Default to full brightness
                if (value !== "full") {
                    adjustmentValue = parseInt(value, 10);
                }

                // Get the current brightness and adjust it
                getCurrentBrightness()
                    .then((currentBrightness) => {
                        let newBrightness = currentBrightness;

                        if (action === "increase") {
                            newBrightness = Math.min(100, currentBrightness + adjustmentValue); // Cap at 100%
                        } else if (action === "decrease") {
                            newBrightness = Math.max(0, currentBrightness - adjustmentValue); // Floor at 0%
                        }

                        setBrightness(newBrightness, res);
                    })
                    .catch((error) => {
                        console.error("Error getting current brightness:", error);
                        res.status(500).json({ error: "Failed to get current brightness" });
                    });
                return;
            } else {
                res.status(400).json({ error: "Invalid brightness command. Please specify a valid brightness level." });
                return;
            }
        }

        // Check if the prompt is a command to open the control panel

        if (prompt.toLowerCase().includes("open control panel")) {
            exec(`start control`, (error) => {
                if (error) {
                    console.error("Error opening control panel:", error);
                    return res.status(500).json({ error: "Failed to open control panel" });
                }
                console.log("Control panel opened successfully.");
                res.json({ response: "Opening control panel..." });
            });
            return;
        }

        // Check if the prompt is a command to open the command prompt
        if (prompt.toLowerCase().includes("open command prompt")) {
            exec(`start cmd`, (error) => {
                if (error) {
                    console.error("Error details:", error);
                    return res.status(500).json({ error: "Failed to open command prompt" });
                }
                console.log("Command prompt opened successfully.");
                res.json({ response: "Opening command prompt..." });
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

exec(`echo Hello`, (error, stdout, stderr) => {
    if (error) {
        console.error("Error executing command:", error);
        return;
    }
    console.log("Command output:", stdout);
});