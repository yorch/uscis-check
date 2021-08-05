import { sendSms } from './send-sms.js';

sendSms({
    body: 'Test test',
    recipients: ['+1 786 532 4137'.trim()],
});
