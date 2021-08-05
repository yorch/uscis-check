import { stripIndents } from 'common-tags';
import { checkStatus } from './check-status.js';
import { createLogger } from './logger.js';
import { sendSms } from './send-sms.js';
import { getStorage } from './storage.js';

const logger = createLogger('Task');

export const task = async () => {
    const key = 'status';

    const storage = getStorage();
    const status = await checkStatus();

    logger.info(status, 'Current status');

    const previousStatus = storage.get(key);

    if (!previousStatus) {
        logger.info('No previous status');
    } else {
        logger.info(previousStatus, 'Previous status');
    }

    if (JSON.stringify(previousStatus) !== JSON.stringify(status)) {
        storage.set('status', status);

        await sendSms({
            body: stripIndents`
                Status: ${status.currentStatus}
                ${status.title}
                ${status.details}
            `,
        });
    }
};
