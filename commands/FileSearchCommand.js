import { exec } from 'child_process';
import { BaseCommand } from './BaseCommand.js';
import { getPlatform } from '../utils/platform.js';

export class FileSearchCommand extends BaseCommand {
    constructor() {
        super('search', ['find file', 'search file', 'locate file'], 'Search and organize files');
    }

    matches(prompt) {
        const lowerPrompt = prompt.toLowerCase();
        return lowerPrompt.includes('find file') || 
               lowerPrompt.includes('search file') ||
               lowerPrompt.includes('locate file') ||
               (lowerPrompt.includes('find') && (lowerPrompt.includes('.pdf') || lowerPrompt.includes('.doc') || lowerPrompt.includes('.txt')));
    }

    async execute(prompt, res) {
        this.logExecuting();
        
        try {
            const fileMatch = prompt.match(/(?:find|search|locate)\s+(?:file\s+)?(.+)/i);
            if (!fileMatch) {
                res.json({ response: 'Please specify what file to search for.' });
                return;
            }

            const searchTerm = fileMatch[1].trim();
            const { isMac } = getPlatform();
            
            const command = isMac
                ? `mdfind "kMDItemDisplayName == '*${searchTerm}*'" | head -10`
                : `where /r c:\\ "*${searchTerm}*" 2>nul | findstr /v /i "system32 windows" | head -10`;

            exec(command, { timeout: 10000 }, (error, stdout) => {
                if (error) {
                    this.handleError(error, res, 'Failed to search for files');
                    return;
                }

                const results = stdout.trim().split('\n').filter(line => line.length > 0);
                
                if (results.length === 0) {
                    res.json({ response: `No files found matching "${searchTerm}".` });
                } else {
                    const fileList = results.slice(0, 5).map((file, index) => `${index + 1}. ${file}`).join('\n');
                    this.logSuccess(`Found ${results.length} files matching "${searchTerm}"`);
                    res.json({ response: `Found files matching "${searchTerm}":\n${fileList}` });
                }
            });
            
        } catch (error) {
            this.handleError(error, res, 'Failed to search for files');
        }
    }
}
