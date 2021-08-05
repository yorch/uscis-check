import { stripIndents } from 'common-tags';
import { checkStatus } from './check-status.js';
import { createLogger } from './logger.js';
import { sendSms } from './send-sms.js';
import { getStorage } from './storage.js';

const logger = createLogger('Task');

const KEY = 'status';

export const task = async () => {
    const storage = await getStorage();
    const status = await checkStatus();

    logger.info(status, 'Current status');

    const previousStatus = await storage.get(KEY);

    if (!previousStatus) {
        logger.debug('No previous status');
    } else {
        logger.debug(previousStatus, 'Previous status');
    }

    if (JSON.stringify(previousStatus) === JSON.stringify(status)) {
        logger.info(
            'Current and previous status are the same, no notification sent'
        );
    } else {
        await storage.set(KEY, status);

        const content = stripIndents`
            Status: ${status.currentStatus}
            ${status.title}
            ${status.details}
        `;

        await sendSms({
            body: content,
        });
    }
};
