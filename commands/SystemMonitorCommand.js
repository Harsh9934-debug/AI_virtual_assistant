import { exec } from 'child_process';
import os from 'os';
import { BaseCommand } from './BaseCommand.js';
import { getPlatform } from '../utils/platform.js';

export class SystemMonitorCommand extends BaseCommand {
    constructor() {
        super('system', ['system status', 'performance', 'cpu usage', 'memory usage', 'disk space'], 'Monitor system performance');
    }

    matches(prompt) {
        const lowerPrompt = prompt.toLowerCase();
        return lowerPrompt.includes('system status') || 
               lowerPrompt.includes('performance') ||
               lowerPrompt.includes('cpu') ||
               lowerPrompt.includes('memory') ||
               lowerPrompt.includes('disk space') ||
               lowerPrompt.includes('storage');
    }

    formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    async getDiskSpace() {
        return new Promise((resolve, reject) => {
            const { isMac } = getPlatform();
            const command = isMac ? 'df -h /' : 'wmic logicaldisk get size,freespace,caption';
            
            exec(command, (error, stdout) => {
                if (error) return reject(error);
                resolve(stdout);
            });
        });
    }

    async execute(prompt, res) {
        this.logExecuting();
        
        try {
            // System information
            const totalMem = os.totalmem();
            const freeMem = os.freemem();
            const usedMem = totalMem - freeMem;
            const memUsagePercent = ((usedMem / totalMem) * 100).toFixed(1);
            
            const cpus = os.cpus();
            const cpuModel = cpus[0].model;
            const cpuCores = cpus.length;
            
            // Get load average (Unix-like systems)
            const loadAvg = os.loadavg();
            const cpuLoad = ((loadAvg[0] / cpuCores) * 100).toFixed(1);
            
            const uptime = os.uptime();
            const uptimeHours = Math.floor(uptime / 3600);
            const uptimeMinutes = Math.floor((uptime % 3600) / 60);
            
            let diskInfo = '';
            try {
                const diskData = await this.getDiskSpace();
                diskInfo = `Disk usage information: ${diskData.split('\n')[1] || 'Unable to retrieve disk info'}`;
            } catch (error) {
                diskInfo = 'Unable to retrieve disk information.';
            }

            const systemReport = `System Status Report:
CPU: ${cpuModel} (${cpuCores} cores)
CPU Load: ${cpuLoad}% 
Memory: ${this.formatBytes(usedMem)} / ${this.formatBytes(totalMem)} (${memUsagePercent}% used)
Uptime: ${uptimeHours} hours ${uptimeMinutes} minutes
${diskInfo}`;

            this.logSuccess('System status retrieved');
            res.json({ response: systemReport });
            
        } catch (error) {
            this.handleError(error, res, 'Failed to get system information');
        }
    }
}
