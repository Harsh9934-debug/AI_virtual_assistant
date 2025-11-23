import logger from '../utils/logger.js';

export class BaseCommand {
    constructor(name, aliases = [], description = '') {
        this.name = name;
        this.aliases = aliases;
        this.description = description;
    }

    matches(prompt) {
        const lowerPrompt = prompt.toLowerCase();
        return [this.name, ...this.aliases].some(keyword => 
            lowerPrompt.includes(keyword.toLowerCase())
        );
    }

    async execute(prompt, res) {
        throw new Error('Execute method must be implemented');
    }

    handleError(error, res, message = 'Command execution failed') {
        logger.command(this.name, 'error');
        logger.error(`${message}:`, error.message);
        return res.status(500).json({ 
            error: message, 
            details: error.message 
        });
    }

    logSuccess(message) {
        logger.command(this.name, 'success');
        logger.success(message);
    }

    logExecuting() {
        logger.command(this.name, 'executing');
    }
}
