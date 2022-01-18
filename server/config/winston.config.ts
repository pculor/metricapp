import appRoot from 'app-root-path';
import * as winston from 'winston';

const options = {
  file: {
    level: 'info',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
    // silent: process.env.NODE_ENV === 'test',
  },
  levels: {
    http: 6,
    trace: 5,
    debug: 4,
    info: 3,
    warn: 2,
    error: 1,
    fatal: 0,
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    trace: 'white',
    debug: 'magenta',
  },
};

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple(),
    winston.format.colorize({ all: true }),
    winston.format.printf(
      (info) => `${info.timestamp} - ${info.level}: ${info.message}`,
    ),
  ),
  levels: options.levels,
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false,
});

export default logger;
