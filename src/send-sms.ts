import { SmsSender } from 'simple-sms-sender';
import { config } from './config.js';
import { createLogger } from './logger.js';

const logger = createLogger('SendSMS');

export const sendSms = ({ body }: { body: string }) => {
    const {
        recipientPhoneNumber,
        twilio: { accountSid, from, secret, sid },
    } = config;

    const smsSender = new SmsSender({
        accountSid,
        fromNumber: from,
        logger,
        secret,
        sid,
    });

    return smsSender.sendSms({
        body,
        recipients: [recipientPhoneNumber],
    });
};
