import { BaseCommand } from './BaseCommand.js';

export class DateTimeCommand extends BaseCommand {
    constructor() {
        super('datetime', ['what time', 'current time', 'what date', 'today date'], 'Get current date and time');
    }

    matches(prompt) {
        const lowerPrompt = prompt.toLowerCase();
        return lowerPrompt.includes('what time') || 
               lowerPrompt.includes('current time') ||
               lowerPrompt.includes('what date') ||
               lowerPrompt.includes('today') ||
               lowerPrompt.includes("what's the time") ||
               lowerPrompt.includes("what's today");
    }

    async execute(prompt, res) {
        this.logExecuting();
        
        try {
            const now = new Date();
            const timeString = now.toLocaleTimeString();
            const dateString = now.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            const lowerPrompt = prompt.toLowerCase();
            let response = '';

            if (lowerPrompt.includes('time')) {
                response = `The current time is ${timeString}.`;
            } else if (lowerPrompt.includes('date') || lowerPrompt.includes('today')) {
                response = `Today is ${dateString}.`;
            } else {
                response = `Today is ${dateString} and the current time is ${timeString}.`;
            }

            this.logSuccess('Date/time information provided');
            res.json({ response });
        } catch (error) {
            this.handleError(error, res, 'Failed to get date/time information');
        }
    }
}
