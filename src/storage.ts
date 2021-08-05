import { dirname, join } from 'path';
import findUp from 'find-up';
import Keyv from 'keyv';
import { KeyvFile } from 'keyv-file';
import { createLogger } from './logger.js';

const logger = createLogger('Storage');

let keyv: Keyv;

const getStorageFilePath = async () => {
    const packageRoot = dirname(await findUp('package.json'));

    return join(packageRoot, 'data', 'storage.json');
};

export const getStorage = async () => {
    if (!keyv) {
        keyv = new Keyv({
            store: new KeyvFile({
                filename: await getStorageFilePath(),
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
