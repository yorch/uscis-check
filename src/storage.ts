import { join } from 'path';
import Keyv from 'keyv';
import { KeyvFile } from 'keyv-file';
import { config } from './config.js';
import { getCurrentDirname } from './get-current-dirname.js';
import { createLogger } from './logger.js';

const logger = createLogger('Storage');

let keyv: Keyv;

export const getStorage = () => {
    const { storageKeyvFile } = config;

    if (!keyv) {
        keyv = new Keyv({
            store: new KeyvFile({
                filename: join(getCurrentDirname(), storageKeyvFile),
                // expiredCheckDelay: 24 * 3600 * 1000, // ms, check and remove expired data in each ms
                writeDelay: 100, // ms, batch write to disk in a specific duration, enhance write performance.
                encode: JSON.stringify, // serialize function
                decode: JSON.parse, // deserialize function
            }),
        });

        keyv.on('error', (err) => logger.error(err, 'Connection Error'));
    }

    return keyv;
};
