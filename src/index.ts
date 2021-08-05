import { config } from './config.js';
import { createLogger } from './logger.js';
import { runCronTask } from './run-cron-task.js';
import { task } from './task.js';

const logger = createLogger('Main');

(async () => {
    const { cronSchedule } = config;

    logger.info('Starting');

    // Run immediately first
    task();

    runCronTask(cronSchedule, task);
})();
