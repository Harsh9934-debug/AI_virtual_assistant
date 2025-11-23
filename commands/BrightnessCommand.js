import { exec } from 'child_process';
import { BaseCommand } from './BaseCommand.js';
import { getPlatform } from '../utils/platform.js';
import logger from '../utils/logger.js';

export class BrightnessCommand extends BaseCommand {
    constructor() {
        super('brightness', ['adjust brightness', 'change brightness'], 'Adjust screen brightness');
    }

    matches(prompt) {
        return prompt.toLowerCase().includes('brightness');
    }

    async getCurrentBrightness() {
        const { isMac } = getPlatform();
        
        return new Promise((resolve, reject) => {
            const command = isMac
                ? `osascript -e 'tell application "System Events" to get brightness of (first display whose builtin is true)'`
                : `powershell.exe -command "(Get-WmiObject -Namespace root/wmi -Class WmiMonitorBrightness).CurrentBrightness"`;

            exec(command, (error, stdout) => {
                if (error) return reject(error);
                const brightness = isMac 
                    ? Math.round(parseFloat(stdout.trim()) * 100)
                    : parseInt(stdout.trim(), 10);
                logger.info(`Current brightness: ${brightness}%`);
                resolve(brightness);
            });
        });
    }

    async setBrightness(level) {
        const { isMac } = getPlatform();
        
        return new Promise((resolve, reject) => {
            const command = isMac
                ? `osascript -e 'tell application "System Events" to set brightness of (first display whose builtin is true) to ${level / 100}'`
                : `powershell.exe -command "(Get-WmiObject -Namespace root/wmi -Class WmiMonitorBrightnessMethods).WmiSetBrightness(1, ${level})"`;

            exec(command, (error) => {
                if (error) return reject(error);
                logger.info(`Setting brightness to: ${level}%`);
                resolve();
            });
        });
    }

    async execute(prompt, res) {
        this.logExecuting();
        
        try {
            // Match patterns like: "increase brightness", "decrease brightness by 10", "set brightness to 50"
            const match = prompt.match(/(increase|decrease|set)\s+brightness\s*(?:(to|by)\s+)?(\d+|full)?/i);
            
            if (!match) {
                logger.warning('Invalid brightness command format');
                return res.status(400).json({ 
                    error: "Invalid brightness command. Use: 'increase brightness', 'decrease brightness by 10', or 'set brightness to 50'" 
                });
            }

            const action = match[1].toLowerCase();
            const value = match[3] ? match[3].toLowerCase() : null;
            
            // Default adjustment value (10% if not specified)
            let adjustmentValue = 10;
            
            if (value === 'full') {
                adjustmentValue = 100;
            } else if (value) {
                adjustmentValue = parseInt(value, 10);
            }

            const currentBrightness = await this.getCurrentBrightness();
            let newBrightness = currentBrightness;

            if (action === 'increase') {
                newBrightness = Math.min(100, currentBrightness + adjustmentValue);
            } else if (action === 'decrease') {
                newBrightness = Math.max(0, currentBrightness - adjustmentValue);
            } else if (action === 'set') {
                if (!value) {
                    return res.status(400).json({ 
                        error: "Please specify a brightness level. Use: 'set brightness to 50'" 
                    });
                }
                newBrightness = Math.min(100, Math.max(0, adjustmentValue));
            }

            await this.setBrightness(newBrightness);
            this.logSuccess(`Brightness adjusted: ${currentBrightness}% → ${newBrightness}%`);
            res.json({ response: `Brightness ${action === 'set' ? 'set' : 'adjusted'} to ${newBrightness}% successfully.` });
        } catch (error) {
            this.handleError(error, res, 'Failed to adjust brightness');
        }
    }
}
