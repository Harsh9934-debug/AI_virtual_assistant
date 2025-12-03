import { exec } from 'child_process';
import { BaseCommand } from './BaseCommand.js';
import { getPlatform } from '../utils/platform.js';

export class VolumeCommand extends BaseCommand {
    constructor() {
        super('volume', ['set volume', 'volume up', 'volume down', 'mute'], 'Control system volume');
    }

    matches(prompt) {
        const lowerPrompt = prompt.toLowerCase();
        return lowerPrompt.includes('volume') || 
               lowerPrompt.includes('mute') ||
               lowerPrompt.includes('unmute');
    }

    async execute(prompt, res) {
        this.logExecuting();
        
        try {
            const { isMac } = getPlatform();
            const lowerPrompt = prompt.toLowerCase();

            let command = '';
            let response = '';

            if (lowerPrompt.includes('mute') && !lowerPrompt.includes('unmute')) {
                command = isMac 
                    ? 'osascript -e "set volume output muted true"'
                    : 'nircmd.exe mutesysvolume 1';
                response = 'Volume muted.';
            } else if (lowerPrompt.includes('unmute')) {
                command = isMac 
                    ? 'osascript -e "set volume output muted false"'
                    : 'nircmd.exe mutesysvolume 0';
                response = 'Volume unmuted.';
            } else {
                const volumeMatch = prompt.match(/volume\s+(?:to\s+)?(\d+)/i);
                const upMatch = lowerPrompt.includes('volume up') || lowerPrompt.includes('increase volume');
                const downMatch = lowerPrompt.includes('volume down') || lowerPrompt.includes('decrease volume');

                if (volumeMatch) {
                    const level = Math.min(100, Math.max(0, parseInt(volumeMatch[1])));
                    command = isMac 
                        ? `osascript -e "set volume output volume ${level}"`
                        : `nircmd.exe setsysvolume ${Math.round(level * 655.35)}`;
                    response = `Volume set to ${level}%.`;
                } else if (upMatch) {
                    command = isMac 
                        ? 'osascript -e "set volume output volume ((output volume of (get volume settings)) + 10)"'
                        : 'nircmd.exe changesysvolume 6553';
                    response = 'Volume increased.';
                } else if (downMatch) {
                    command = isMac 
                        ? 'osascript -e "set volume output volume ((output volume of (get volume settings)) - 10)"'
                        : 'nircmd.exe changesysvolume -6553';
                    response = 'Volume decreased.';
                } else {
                    res.json({ response: 'Please specify a volume level (0-100), or say "volume up", "volume down", or "mute".' });
                    return;
                }
            }

            exec(command, (error) => {
                if (error) {
                    this.handleError(error, res, 'Failed to control volume');
                } else {
                    this.logSuccess('Volume control executed');
                    res.json({ response });
                }
            });

        } catch (error) {
            this.handleError(error, res, 'Failed to control volume');
        }
    }
}
