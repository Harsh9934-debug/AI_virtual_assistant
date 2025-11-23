import open from 'open';
import { BaseCommand } from './BaseCommand.js';

export class WebCommand extends BaseCommand {
    constructor(name, url, aliases = []) {
        super(name, aliases, `Open ${name}`);
        this.url = url;
    }

    async execute(prompt, res) {
        this.logExecuting();
        
        try {
            await open(this.url);
            this.logSuccess(`${this.name} opened successfully`);
            res.json({ response: `Opening ${this.name}...` });
        } catch (error) {
            this.handleError(error, res, `Failed to open ${this.name}`);
        }
    }
}
