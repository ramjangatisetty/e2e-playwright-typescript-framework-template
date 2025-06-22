import winston from 'winston';
import fs from 'fs';
import path from 'path';

// Ensure the log directory exists
const logDir = path.resolve('logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `[${level.toUpperCase()}] ${timestamp} - ${message}`;
});

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    logFormat
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        logFormat
      )
    }),
    new winston.transports.File({
      filename: path.join(logDir, 'test.log'),
      level: 'info',
      options: { flags: 'a' } // append mode
    })
  ],
  exitOnError: false
});
