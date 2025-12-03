import { BaseCommand } from './BaseCommand.js';
import { exec } from 'child_process';
import { getPlatform } from '../utils/platform.js';

export class TimerCommand extends BaseCommand {
    constructor() {
        super('timer', ['set timer', 'start timer', 'stopwatch', 'countdown'], 'Timer and stopwatch functionality');
        this.timers = new Map();
        this.stopwatches = new Map();
        this.timerCallbacks = new Map(); // Store callbacks for timer notifications
    }

    matches(prompt) {
        return prompt.toLowerCase().includes('timer') || 
               prompt.toLowerCase().includes('stopwatch') ||
               prompt.toLowerCase().includes('countdown');
    }

    parseTime(timeStr) {
        const match = timeStr.match(/(\d+)\s*(minute|minutes|min|second|seconds|sec|hour|hours|hr)/i);
        if (!match) return null;
        
        const value = parseInt(match[1]);
        const unit = match[2].toLowerCase();
        
        if (unit.startsWith('sec')) return value * 1000;
        if (unit.startsWith('min')) return value * 60 * 1000;
        if (unit.startsWith('hour') || unit.startsWith('hr')) return value * 60 * 60 * 1000;
        
        return null;
    }

    speakNotification(message) {
        try {
            const { isMac } = getPlatform();
            const command = isMac 
                ? `say "${message}"`
                : `powershell -command "Add-Type -AssemblyName System.speech; (New-Object System.Speech.Synthesis.SpeechSynthesizer).Speak('${message}')"`;
            
            exec(command, (error) => {
                if (error) {
                    console.error('Text-to-speech error:', error);
                    // Fallback: just log the message
                    console.log('🔔 TIMER NOTIFICATION:', message);
                }
            });
        } catch (error) {
            console.error('Speech notification failed:', error);
            console.log('🔔 TIMER NOTIFICATION:', message);
        }
    }

    async execute(prompt, res) {
        this.logExecuting();
        
        try {
            const lowerPrompt = prompt.toLowerCase();
            
            if (lowerPrompt.includes('start stopwatch')) {
                const id = Date.now().toString();
                this.stopwatches.set(id, { startTime: Date.now() });
                res.json({ response: 'Stopwatch started. Say "stop stopwatch" to end it.' });
                return;
            }
            
            if (lowerPrompt.includes('stop stopwatch')) {
                const stopwatch = Array.from(this.stopwatches.values()).pop();
                if (stopwatch) {
                    const elapsed = Date.now() - stopwatch.startTime;
                    const seconds = Math.floor(elapsed / 1000);
                    const minutes = Math.floor(seconds / 60);
                    const remainingSeconds = seconds % 60;
                    
                    this.stopwatches.clear();
                    res.json({ response: `Stopwatch stopped. Elapsed time: ${minutes} minutes and ${remainingSeconds} seconds.` });
                } else {
                    res.json({ response: 'No stopwatch is currently running.' });
                }
                return;
            }
            
            // Timer functionality
            const timerMatch = prompt.match(/(?:set|start)?\s*timer\s+(?:for\s+)?(.+)/i);
            if (timerMatch) {
                const timeStr = timerMatch[1];
                const duration = this.parseTime(timeStr);
                
                if (!duration) {
                    res.json({ response: 'Please specify a valid time like "5 minutes" or "30 seconds".' });
                    return;
                }
                
                const id = Date.now().toString();
                const minutes = Math.floor(duration / 60000);
                const seconds = Math.floor((duration % 60000) / 1000);
                const timerDescription = `${minutes > 0 ? minutes + ' minutes ' : ''}${seconds} seconds`;
                
                const timeout = setTimeout(() => {
                    console.log('🔔 Timer finished!');
                    this.timers.delete(id);
                    
                    // Multiple notification methods
                    const notification = `Timer finished! Your ${timerDescription} timer is complete.`;
                    
                    // 1. Console notification with emoji
                    console.log('🔔 TIMER ALERT:', notification);
                    
                    // 2. System speech notification
                    this.speakNotification(notification);
                    
                    // 3. Try to play system sound (macOS)
                    if (getPlatform().isMac) {
                        exec('afplay /System/Library/Sounds/Glass.aiff', () => {});
                    }
                    
                }, duration);
                
                this.timers.set(id, { 
                    timeout, 
                    duration, 
                    description: timerDescription,
                    startTime: Date.now()
                });
                
                this.logSuccess(`Timer set for ${timerDescription}`);
                res.json({ response: `Timer set for ${timerDescription}. I'll notify you when it's done.` });
            } else {
                res.json({ response: 'Please specify a timer duration, like "set timer for 5 minutes".' });
            }
            
        } catch (error) {
            this.handleError(error, res, 'Failed to manage timer');
        }
    }

    // Method to check active timers
    getActiveTimers() {
        return Array.from(this.timers.entries()).map(([id, timer]) => ({
            id,
            description: timer.description,
            remaining: timer.duration - (Date.now() - timer.startTime)
        }));
    }
}
