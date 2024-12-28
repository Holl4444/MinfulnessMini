import { FILE_PATH } from './config.js';
import { readFile, writeFile } from './config.js';

export async function getQuotes() {
  const quotes = await readFile();
  return quotes;
}

// Filter for quotes with tags that include the given keyword
export async function getQuotesByKeyword(keyword) {
  try {
    const quotes = await getQuotes();
    const keyQuotes = quotes.filter(
      (quote) => quote.Tags && quote.Tags.includes(keyword)
    );
    return keyQuotes;
  } catch (err) {
    console.error('Error fetching quotes by keyword:', err);
    return [];
  }
}

// Filter out tags
export function getQuoteAndAuthor(quotes) {
  return quotes.map((quote) => {
    return {
      Quote: quote.Quote || 'No quote Available',
      Author: quote.Author || 'Unknown',
    };
  });
}

export function getRandomIndex(length) {
  const index = Math.floor(Math.random() * length);
  return index;
}

// Find empty or repeated quotes
export async function removeDoubledAndEmpty() {
  const quotes = await getQuotes();
  const uniqueQuotes = [];
  const seenQuotes = new Set();
  const removedQuotes = [];
  for (const q of quotes) {
    if (q.Quote && !seenQuotes.has(q.Quote)) {
      seenQuotes.add(q.Quote);
      uniqueQuotes.push(q);
    } else {
      removedQuotes.push(q);
    }
  }
  console.log(
    `quotes length: ${quotes.length}\ Unique quotes length: ${uniqueQuotes.length}`
  );
  return [
    uniqueQuotes,
    removedQuotes,
    quotes.length - uniqueQuotes.length,
  ];
}

export async function deleteDoubledAndEmpty() {
  try {
    const cleanAndRemoved = await removeDoubledAndEmpty();
    const [cleanQuotes, removedQuotes, numRemoved] = cleanAndRemoved;
 
    if (numRemoved > 0) {
      await writeFile(cleanQuotes);
      return {
        numRemoved: numRemoved,
        removedQuotes: removedQuotes,
        cleanQuotes: cleanQuotes,
      };
    }
    console.log('No duplicates or empty quotes found');
    return {
      numRemoved: 0,
      removedQuotes: [],
      cleanQuotes: cleanQuotes,
    };
  } catch (err) {
    console.log(`Could not clean the quotes object: ${err.message}`);
    return null;
  }
}
