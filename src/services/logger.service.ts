import fs from 'fs';
import path from 'path';

export enum LogLevel {
    INFO = 'INFO',
    WARN = 'WARN',
    ERROR = 'ERROR',
    DEBUG = 'DEBUG'
}

export class Logger {
    private logFilePath: string;

    constructor(logFileName: string = 'app.log') {
        this.logFilePath = path.join(__dirname, '..', '..', 'logs', logFileName);
        this.ensureLogDirectoryExists();
    }

    private ensureLogDirectoryExists(): void {
        const logDir = path.dirname(this.logFilePath);
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true });
        }
    }

    private logMessage(level: LogLevel, message: string, data?: any): void {
        const timestamp = new Date().toISOString();
        const logEntry = `[${timestamp}] [${level}] ${message} ${data ? JSON.stringify(data) : ''}`;

        console.log(logEntry);
        fs.appendFileSync(this.logFilePath, logEntry + '\n');
    }

    public info(message: string, data?: any): void {
        this.logMessage(LogLevel.INFO, message, data);
    }

    public warn(message: string, data?: any): void {
        this.logMessage(LogLevel.WARN, message, data);
    }

    public error(message: string, data?: any): void {
        this.logMessage(LogLevel.ERROR, message, data);
    }

    public debug(message: string, data?: any): void {
        this.logMessage(LogLevel.DEBUG, message, data);
    }
}

// logger.info('Приложение запущено');
// logger.warn('Предупреждение: низкий заряд батареи', { batteryLevel: 15 });
// logger.error('Произошла ошибка', { errorCode: 500, message: 'Internal Server Error' });
// logger.debug('Отладочная информация', { userId: 123, action: 'login' });