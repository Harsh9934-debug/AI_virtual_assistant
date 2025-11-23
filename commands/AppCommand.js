import { exec } from 'child_process';
import { BaseCommand } from './BaseCommand.js';
import { getCommand } from '../utils/platform.js';

export class AppCommand extends BaseCommand {
    constructor(name, macApp, windowsApp, aliases = []) {
        super(name, aliases, `Open ${name}`);
        this.macApp = macApp;
        this.windowsApp = windowsApp;
    }

    async execute(prompt, res) {
        this.logExecuting();
        
        const command = getCommand(
            `open -a "${this.macApp}"`,
            `start ${this.windowsApp}`
        );

        exec(command, (error) => {
            if (error) {
                this.handleError(error, res, `Failed to open ${this.name}`);
            } else {
                this.logSuccess(`${this.name} opened successfully`);
                res.json({ response: `Opening ${this.name}...` });
            }
        });
    }
}





