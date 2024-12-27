import { FILE_PATH } from './config.js';
import { readFile, writeFile } from './config.js';


export async function getQuotes() {
    const quotes = await readFile();
    return quotes;
}