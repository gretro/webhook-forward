import pino from 'pino';
import { appConfig } from '../../config';

const prettyLogger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      sync: appConfig.logger.sync,
    },
  },
});

const logger = pino({});

export function getLogger() {
  return appConfig.logger.pretty ? prettyLogger : logger;
}
