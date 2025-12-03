import { exec } from 'child_process';
import { BaseCommand } from './BaseCommand.js';
import { getPlatform } from '../utils/platform.js';

export class SmartRoutineCommand extends BaseCommand {
    constructor() {
        super('routine', ['morning routine', 'work mode', 'focus mode', 'end workday'], 'Smart automation routines');
    }

    matches(prompt) {
        const lowerPrompt = prompt.toLowerCase();
        return lowerPrompt.includes('morning routine') || 
               lowerPrompt.includes('work mode') ||
               lowerPrompt.includes('focus mode') ||
               lowerPrompt.includes('end workday') ||
               lowerPrompt.includes('start workday');
    }

    async openApps(apps) {
        const { isMac } = getPlatform();
        
        for (const app of apps) {
            const command = isMac ? `open -a "${app}"` : `start ${app}`;
            exec(command, () => {});
            await new Promise(resolve => setTimeout(resolve, 1000)); // Delay between apps
        }
    }

    async execute(prompt, res) {
        this.logExecuting();
        
        try {
            const lowerPrompt = prompt.toLowerCase();

            if (lowerPrompt.includes('morning routine')) {
                const morningApps = ['Calendar', 'Mail', 'Safari'];
                
                await this.openApps(morningApps);
                
                // Open useful websites
                exec('open https://news.google.com', () => {});
                setTimeout(() => exec('open https://weather.com', () => {}), 2000);

                this.logSuccess('Morning routine activated');
                res.json({ 
                    response: 'Good morning! I\'ve opened your calendar, email, news, and weather. Have a productive day!' 
                });
                return;
            }

            if (lowerPrompt.includes('work mode') || lowerPrompt.includes('focus mode')) {
                const workApps = ['Visual Studio Code', 'Terminal', 'Slack'];
                
                await this.openApps(workApps);
                
                // Enable Do Not Disturb on Mac
                if (getPlatform().isMac) {
                    exec('shortcuts run "Turn On Do Not Disturb"', () => {});
                }

                this.logSuccess('Work mode activated');
                res.json({ 
                    response: 'Work mode activated! I\'ve opened your development tools and enabled focus mode. Time to be productive!' 
                });
                return;
            }

            if (lowerPrompt.includes('end workday')) {
                // Close work applications
                const { isMac } = getPlatform();
                
                const appsToClose = ['Visual Studio Code', 'Slack', 'Terminal'];
                
                for (const app of appsToClose) {
                    const command = isMac 
                        ? `osascript -e 'quit app "${app}"'`
                        : `taskkill /f /im ${app}.exe`;
                    exec(command, () => {});
                }

                // Disable Do Not Disturb
                if (isMac) {
                    exec('shortcuts run "Turn Off Do Not Disturb"', () => {});
                }

                this.logSuccess('Work day ended');
                res.json({ 
                    response: 'Workday complete! I\'ve closed your work applications. Time to relax and enjoy your evening!' 
                });
                return;
            }

            res.json({ response: 'I can help with morning routine, work mode, focus mode, or ending your workday.' });

        } catch (error) {
            this.handleError(error, res, 'Failed to execute routine');
        }
    }
}
