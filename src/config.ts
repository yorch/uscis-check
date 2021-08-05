const { env } = process;

export const config = {
    caseNumber: env.CASE_NUMBER,
    cronSchedule: env.CRON_SCHEDULE,
    messageHeader: env.MESSAGE_HEADER,
    nodeEnv: env.NODE_ENV,
    recipientPhoneNumber: env.RECIPIENT_PHONE_NUMBER,
    twilio: {
        accountSid: env.TWILIO_ACCOUNT_SID,
        from: env.TWILIO_FROM,
        messagingServiceSid: env.TWILIO_MESSAGING_SERVICE_SID,
        secret: env.TWILIO_SECRET,
        sid: env.TWILIO_SID,
    },
};
