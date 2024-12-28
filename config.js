import path from 'node:path';
import { promises as fs } from 'fs';

export const FILE_PATH = path.resolve(process.cwd(), 'quotes.json');

//Read file function
//Make an async function
export async function readFile() {
  //try catch
  try {
    const quotes = await fs.readFile(FILE_PATH, 'utf8');
    if (!quotes) {
      console.log('File empty');
      return [];
    }
    return JSON.parse(quotes);
  } catch (err) {
    console.log(
      'Aye Carumba there was a problem reading the file',
      err.message
    );
    return null;
  }
}

//Write file function
export async function writeFile(quotes) {
  try {
    if (!Array.isArray(quotes) || quotes.length === 0) {
      throw new Error('Invalid data: must be a non-empty array.');
    }
    await fs.writeFile(
      FILE_PATH,
      JSON.stringify(quotes, null, 2),
      'utf8'
    );
    console.log('File written Successfully');
    return true;
  } catch (err) {
    console.log('There was a problem writing to the file', err);
    return false;
  }
}
