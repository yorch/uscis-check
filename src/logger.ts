import pino from 'pino';
import { config } from './config.js';

const { nodeEnv } = config;

const opts =
    nodeEnv === 'production'
        ? {}
        : {
              prettyPrint: {
                  levelFirst: true,
                  translateTime: true,
              },
              prettifier: import('pino-pretty'),
          };

const logger = pino(opts);

export const createLogger = (module: string) => logger.child({ module });
