// Set up express
import express from 'express';
const app = express();
app.use(express.json());
const PORT = 5001;
import http from 'http';
const server = http.createServer(app);

import {
  getQuotes,
  getQuotesByKeyword,
  getQuoteAndAuthor,
  getRandomQuote,
  deleteDoubledAndEmpty,
} from './helpers.js';

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Error handling for listen - more flexible than a callback handler on app.listen.
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use.`);
    // Exit the process with a failure code
    process.exit(1);
  } else {
    console.error(`Server error: ${err}`);
    process.exit(1);
  }
});

// Get a random quote from all that match the keyword
app.get('/quotes/:keyword/random', async function (req, res) {
  try {
    console.log(`Received request for keyword ${req.params.keyword}`);
    const keyQuotes = await getQuotesByKeyword(req.params.keyword);
    if (keyQuotes.length === 0) {
      return res.status(404).send('No quotes found for this keyword');
    }
    const randomKeyQuote = getRandomQuote(keyQuotes);
    res.status(200).json(randomKeyQuote);
  } catch (err) {
    console.log('Error fetching quote: ', err.message);
    res.status(500).send('Internal Server Error');
  }
});

// Get a random quote from amongst all the quotes
app.get('/quotes/random', async function (req, res) {
  try {
    //Get all quotes from source
    const quotes = await getQuotes();
    //can't find any send error
    if (quotes.length === 0) {
      return res.status(404).send('No quotes found');
    }
    const randomQuote = getRandomQuote(quotes);
    res.status(200).json(randomQuote);
  } catch (err) {
    console.log('Error fetching quote: ', err.message);
    res.status(500).send('Internal Server Error');
  }
});

// Filters for the keyword in tags then responds with all matching quotes in quote/author only format
app.get('/quotes/:keyword', async function (req, res) {
  try {
    //Get quotes relevant to keyword
    const quotes = await getQuotesByKeyword(req.params.keyword);
    if (quotes.length === 0) {
      // If no quotes were found, return 404
      return res.status(404).send('No quotes found for this keyword');
    }
    const cleanQuotes = await getQuoteAndAuthor(quotes);
    //TEST random func: console.log(getRandomIndex(quotes.length));
    // Fill response body with them
    res.status(200).json(cleanQuotes);
  } catch (err) {
    console.log('Error fetching the quotes:', err);
    res.status(502).send('Bad Gateway');
  }
});

// Get all quotes and respond with quote/author format
app.get('/quotes', async function (req, res) {
  try {
    const quotes = await getQuotes();
    const cleanQuotes = await getQuoteAndAuthor(quotes);
    res.status(200).json(cleanQuotes);
  } catch (err) {
    console.error('Error fetching quotes:', err);
    res.status(502).send('Bad Gateway');
  }
});

app.get('/', function (req, res) {
  try {
    res.status(200).send("Hi! How're you feeling?");
  } catch (err) {
    res.status(500).send('Some bad juju on our end');
  }
});

// Overwrite quotes removing repeated or empty quotes
app.delete('/quotes', async function (req, res) {
  try {
    const outcome = await deleteDoubledAndEmpty();
    if (outcome === null) {
      return res
        .status(500)
        .send("Couldn't remove invalid quotes at this time");
    }
    //respond with number of quotes that were removed, the removed quotes and the new cleaned quote object or an empty array.
    res.status(200).json(outcome);
  } catch (err) {
    res
      .status(500)
      .send(`Couldn't delete quotes at this time: ${err}`);
  }
});
