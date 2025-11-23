import chalk from 'chalk';

class Logger {
    info(message, ...args) {
        console.log(chalk.blue('ℹ'), message, ...args);
    }

    success(message, ...args) {
        console.log(chalk.green('✓'), message, ...args);
    }

    error(message, ...args) {
        console.log(chalk.red('✖'), message, ...args);
    }

    warning(message, ...args) {
        console.log(chalk.yellow('⚠'), message, ...args);
    }

    command(commandName, status = 'executing') {
        const icon = status === 'success' ? '✓' : status === 'error' ? '✖' : '→';
        const color = status === 'success' ? 'green' : status === 'error' ? 'red' : 'cyan';
        console.log(chalk[color](icon), `Command: ${commandName}`, `[${status}]`);
    }
}

export default new Logger();
