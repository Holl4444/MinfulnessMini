import path from 'node:path';
import { promises as fs } from 'fs'; 

export const FILE_PATH = path.resolve(process.cwd(), 'quotes.json');
// What happens in the code:
// process.cwd() retrieves the current working directory where the Node.js script is being run.
// 'quotes.json' is added to the path, and path.resolve() combines them into a full absolute path.
// This full absolute path is assigned to the FILEPATH constant.
// The FILEPATH constant is then exported so it can be used in other files/modules.
// Example:
// If the current working directory is /home/user/project, and 'albums.json' is in the same directory, path.resolve() would return /home/user/project/albums.json.

// This line is essentially providing an absolute file path to the albums.json file

//Read file function
//Make an async function
export async function readFile() {
  //try catch
  try {
    const quotes = await fs.readFile(FILE_PATH, 'utf8');
    return JSON.parse(quotes);
  } catch (err) {
    console.log(
      'Aye Carumba there was a problem reading the file',
      err
    );
    return null;
  }
}

//Write file function
export async function writeFile(quotes) {
  try {
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