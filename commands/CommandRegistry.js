import { WebCommand } from './WebCommand.js';
import { AppCommand } from './AppCommand.js';
import { BrightnessCommand } from './BrightnessCommand.js';
import { NewsCommand } from './NewsCommand.js';
import { TimerCommand } from './TimerCommand.js';
import { CalculatorCommand } from './CalculatorCommand.js';
import { ScreenshotCommand } from './ScreenshotCommand.js';
import { SystemMonitorCommand } from './SystemMonitorCommand.js';
import { FileSearchCommand } from './FileSearchCommand.js';

export class CommandRegistry {
    constructor() {
        this.commands = [];
        this.registerDefaultCommands();
    }

    registerDefaultCommands() {
        // Web commands
        this.register(new WebCommand('google', 'https://www.google.com', ['open google']));
        this.register(new WebCommand('youtube', 'https://www.youtube.com', ['open youtube']));
        this.register(new WebCommand('whatsapp', 'https://web.whatsapp.com', ['open whatsapp']));

        // App commands
        this.register(new AppCommand('app store', 'App Store', 'microsoft-store:', ['open app store', 'open microsoft store']));
        this.register(new AppCommand('vs code', 'Visual Studio Code', 'code', ['open vs code', 'open vscode']));
        this.register(new AppCommand('brave', 'Brave Browser', 'brave', ['open brave']));
        this.register(new AppCommand('spotify', 'Spotify', 'spotify', ['open spotify']));
        this.register(new AppCommand('calculator', 'Calculator', 'calc', ['open calculator']));
        this.register(new AppCommand('calendar', 'Calendar', 'outlookcal:', ['open calendar']));
        this.register(new AppCommand('finder', 'Finder', 'explorer', ['open finder', 'open file explorer']));
        this.register(new AppCommand('activity monitor', 'Activity Monitor', 'taskmgr', ['open activity monitor', 'open task manager']));
        this.register(new AppCommand('settings', 'System Settings', 'ms-settings:', ['open settings', 'open system preferences', 'open control panel']));
        this.register(new AppCommand('terminal', 'Terminal', 'cmd', ['open terminal', 'open command prompt']));
        this.register(new AppCommand('camera', 'Photo Booth', 'microsoft.windows.camera:', ['open camera']));

        // Feature commands
        this.register(new BrightnessCommand());
        this.register(new NewsCommand());
        this.register(new TimerCommand());
        this.register(new CalculatorCommand());
        this.register(new ScreenshotCommand());
        this.register(new SystemMonitorCommand());
        this.register(new FileSearchCommand());
    }

    register(command) {
        this.commands.push(command);
    }

    async findAndExecute(prompt, res) {
        const command = this.commands.find(cmd => cmd.matches(prompt));
        
        if (command) {
            await command.execute(prompt, res);
            return true;
        }
        
        return false;
    }

    listCommands() {
        return this.commands.map(cmd => ({
            name: cmd.name,
            aliases: cmd.aliases,
            description: cmd.description
        }));
    }
}
