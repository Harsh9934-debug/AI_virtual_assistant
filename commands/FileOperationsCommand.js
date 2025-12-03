import { exec } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import { BaseCommand } from './BaseCommand.js';
import { getPlatform } from '../utils/platform.js';

export class FileOperationsCommand extends BaseCommand {
    constructor() {
        super('file-ops', ['create folder', 'empty trash', 'recent files'], 'File and folder operations');
    }

    matches(prompt) {
        const lowerPrompt = prompt.toLowerCase();
        return lowerPrompt.includes('create folder') || 
               lowerPrompt.includes('make folder') ||
               lowerPrompt.includes('empty trash') ||
               lowerPrompt.includes('recent files') ||
               lowerPrompt.includes('recent documents');
    }

    async execute(prompt, res) {
        this.logExecuting();
        
        try {
            const { isMac } = getPlatform();
            const lowerPrompt = prompt.toLowerCase();

            if (lowerPrompt.includes('empty trash')) {
                const command = isMac 
                    ? 'osascript -e "tell application \\"Finder\\" to empty trash"'
                    : 'rd /s /q %systemdrive%\\$recycle.bin';

                exec(command, (error) => {
                    if (error) {
                        this.handleError(error, res, 'Failed to empty trash');
                    } else {
                        this.logSuccess('Trash emptied successfully');
                        res.json({ response: 'Trash has been emptied.' });
                    }
                });
                return;
            }

            if (lowerPrompt.includes('recent files') || lowerPrompt.includes('recent documents')) {
                const command = isMac 
                    ? 'mdfind "kMDItemContentModificationDate >= $time.now(-86400)" | head -10'
                    : 'forfiles /m *.* /s /c "cmd /c echo @path @fdate @ftime" 2>nul | sort | tail -10';

                exec(command, { timeout: 5000 }, (error, stdout) => {
                    if (error) {
                        res.json({ response: 'Unable to retrieve recent files at the moment.' });
                    } else {
                        const files = stdout.trim().split('\n').filter(f => f.length > 0);
                        if (files.length === 0) {
                            res.json({ response: 'No recent files found.' });
                        } else {
                            const fileList = files.slice(0, 5)
                                .map((file, index) => `${index + 1}. ${path.basename(file)}`)
                                .join('\n');
                            res.json({ response: `Recent files:\n${fileList}` });
                        }
                    }
                });
                return;
            }

            const folderMatch = prompt.match(/(?:create|make)\s+folder\s+(?:called\s+)?(.+)/i);
            if (folderMatch) {
                const folderName = folderMatch[1].trim().replace(/[<>:"/\\|?*]/g, '');
                const desktopPath = isMac ? `~/Desktop/${folderName}` : `%USERPROFILE%\\Desktop\\${folderName}`;
                
                const command = isMac 
                    ? `mkdir -p "${desktopPath}"`
                    : `mkdir "${desktopPath}"`;

                exec(command, (error) => {
                    if (error) {
                        this.handleError(error, res, 'Failed to create folder');
                    } else {
                        this.logSuccess(`Folder created: ${folderName}`);
                        res.json({ response: `Folder "${folderName}" created on desktop.` });
                    }
                });
            } else {
                res.json({ response: 'Please specify the folder name. For example: "Create folder called Projects"' });
            }

        } catch (error) {
            this.handleError(error, res, 'Failed to perform file operation');
        }
    }
}
