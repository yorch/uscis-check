import schedule from 'node-schedule';
import { createLogger } from './logger.js';

const logger = createLogger('RunCronTask');

export const runCronTask = (
    cronSchedule: string,
    task: () => Promise<unknown>
) => {
    logger.info(`Setup cron task, schedule ${cronSchedule}`);

    return schedule.scheduleJob(
        { start: new Date(), rule: cronSchedule },
        async () => {
            logger.info('Running cron task');
            try {
                await task();
                logger.info('Cron task finished');
            } catch (error) {
                logger.error(error, 'There was an error running cron task');
            }
        }
    );
};
