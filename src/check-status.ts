import { load } from 'cheerio';
import got from 'got';
import { config } from './config.js';
import { createLogger } from './logger.js';

const logger = createLogger('CheckCase');

const cleanText = (text: string) =>
    text
        .trim()
        .replace(/[\n|\t]+/g, '')
        .replace(/ +/g, ' ');

const URL = 'https://egov.uscis.gov/casestatus/mycasestatus.do';

export const checkStatus = async () => {
    const { caseNumber } = config;

    if (!caseNumber) {
        const msg = 'No case number was configured, aborting';
        logger.error(msg);
        throw new Error(msg);
    }

    logger.info(`Checking the USCIS Case Number ${caseNumber}`);

    const { body } = await got.post(URL, {
        form: {
            changeLocale: '',
            appReceiptNum: caseNumber,
            initCaseSearch: 'CHECK+STATUS',
        },
    });

    const $ = load(body);
    const $currentStatusSec = $('.current-status-sec');

    const $details = $('.uscis-seal .appointment-sec .text-center');

    return {
        currentStatus: cleanText(
            $currentStatusSec
                .text()
                .replace('Your Current Status:', '')
                .replace('+', '')
        ),
        title: cleanText($('h1', $details).text()),
        details: cleanText($('p', $details).text()),
    };
};
