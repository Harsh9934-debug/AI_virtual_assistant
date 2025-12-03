import { exec } from 'child_process';
import { BaseCommand } from './BaseCommand.js';
import { getPlatform } from '../utils/platform.js';

export class ScreenshotCommand extends BaseCommand {
    constructor() {
        super('screenshot', ['take screenshot', 'capture screen', 'screen capture'], 'Take screenshots');
    }

    matches(prompt) {
        return prompt.toLowerCase().includes('screenshot') || 
               prompt.toLowerCase().includes('screen capture') ||
               prompt.toLowerCase().includes('capture screen');
    }

    async execute(prompt, res) {
        this.logExecuting();
        
        try {
            const { isMac } = getPlatform();
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const filename = `screenshot-${timestamp}.png`;
            const desktopPath = isMac 
                ? `~/Desktop/${filename}`
                : `%USERPROFILE%\\Desktop\\${filename}`;

            const command = isMac
                ? `screencapture -x "${desktopPath}"`
                : `powershell.exe -command "Add-Type -AssemblyName System.Windows.Forms,System.Drawing; $bounds = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds; $bmp = New-Object System.Drawing.Bitmap $bounds.width, $bounds.height; $graphics = [System.Drawing.Graphics]::FromImage($bmp); $graphics.CopyFromScreen($bounds.Location, [System.Drawing.Point]::Empty, $bounds.size); $bmp.Save('${desktopPath}'); $graphics.Dispose(); $bmp.Dispose()"`;

            exec(command, (error) => {
                if (error) {
                    this.handleError(error, res, 'Failed to take screenshot');
                } else {
                    this.logSuccess(`Screenshot saved as ${filename}`);
                    res.json({ response: `Screenshot captured and saved to desktop as ${filename}.` });
                }
            });
            
        } catch (error) {
            this.handleError(error, res, 'Failed to take screenshot');
        }
    }
}
