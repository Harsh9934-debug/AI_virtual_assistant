import { BaseCommand } from './BaseCommand.js';
import { exec } from 'child_process';
import { getPlatform } from '../utils/platform.js';

export class HealthReminderCommand extends BaseCommand {
    constructor() {
        super('health', ['water reminder', 'break reminder', 'posture check'], 'Health and wellness reminders');
        this.reminders = new Map();
    }

    matches(prompt) {
        const lowerPrompt = prompt.toLowerCase();
        return lowerPrompt.includes('water reminder') || 
               lowerPrompt.includes('drink water') ||
               lowerPrompt.includes('break reminder') ||
               lowerPrompt.includes('posture') ||
               lowerPrompt.includes('eye rest') ||
               lowerPrompt.includes('20-20-20');
    }

    speakReminder(message) {
        const { isMac } = getPlatform();
        const command = isMac 
            ? `say "${message}"`
            : `powershell -command "Add-Type -AssemblyName System.speech; (New-Object System.Speech.Synthesis.SpeechSynthesizer).Speak('${message}')"`;
        
        exec(command, () => {});
    }

    async execute(prompt, res) {
        this.logExecuting();
        
        try {
            const lowerPrompt = prompt.toLowerCase();

            if (lowerPrompt.includes('water reminder')) {
                const intervalMatch = prompt.match(/every (\d+) (?:minutes?|hours?)/i);
                const interval = intervalMatch ? parseInt(intervalMatch[1]) : 60;
                const isHours = prompt.toLowerCase().includes('hour');
                const intervalMs = isHours ? interval * 60 * 60 * 1000 : interval * 60 * 1000;

                // Clear existing water reminder
                if (this.reminders.has('water')) {
                    clearInterval(this.reminders.get('water'));
                }

                const reminderInterval = setInterval(() => {
                    const message = 'Time to drink water! Stay hydrated for better health.';
                    console.log('💧 HEALTH REMINDER:', message);
                    this.speakReminder(message);
                }, intervalMs);

                this.reminders.set('water', reminderInterval);
                
                const timeUnit = isHours ? (interval === 1 ? 'hour' : 'hours') : (interval === 1 ? 'minute' : 'minutes');
                res.json({ response: `Water reminder set for every ${interval} ${timeUnit}.` });
                return;
            }

            if (lowerPrompt.includes('break reminder')) {
                const intervalMatch = prompt.match(/every (\d+) minutes/i);
                const interval = intervalMatch ? parseInt(intervalMatch[1]) : 25;
                const intervalMs = interval * 60 * 1000;

                if (this.reminders.has('break')) {
                    clearInterval(this.reminders.get('break'));
                }

                const reminderInterval = setInterval(() => {
                    const message = 'Time for a break! Stand up, stretch, and rest your eyes.';
                    console.log('🧘 BREAK REMINDER:', message);
                    this.speakReminder(message);
                }, intervalMs);

                this.reminders.set('break', reminderInterval);
                res.json({ response: `Break reminder set for every ${interval} minutes.` });
                return;
            }

            if (lowerPrompt.includes('posture')) {
                const message = 'Posture check! Sit up straight, shoulders back, feet flat on the floor.';
                this.speakReminder(message);
                res.json({ response: message });
                return;
            }

            if (lowerPrompt.includes('eye rest') || lowerPrompt.includes('20-20-20')) {
                const message = 'Eye rest time! Look at something 20 feet away for 20 seconds.';
                this.speakReminder(message);
                
                // Set 20-second timer
                setTimeout(() => {
                    this.speakReminder('Eye rest complete. You can return to work now.');
                }, 20000);

                res.json({ response: 'Starting 20-20-20 rule. Look at something 20 feet away for 20 seconds.' });
                return;
            }

            res.json({ response: 'I can help with water reminders, break reminders, posture checks, and eye rest using the 20-20-20 rule.' });

        } catch (error) {
            this.handleError(error, res, 'Failed to set health reminder');
        }
    }
}
