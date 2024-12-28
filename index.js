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
  getRandomIndex,
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

app.get('/', function (req, res) {
  try {
    res.status(200).send("Hi! How're you feeling?");
  } catch (err) {
    res.status(500).send('Some bad juju on our end');
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

// Filters for the keyword in tags then responds with the quotes in quote/author only format
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

//delete doubled quotes
//Find doubled or empty quotes and delete them
app.delete('/quotes', async function (req, res) {
  try {
    //Get quotes minus repeated/empty
    //Overwrite quotes.
    const outcome = await deleteDoubledAndEmpty();
    if (outcome === null) {
      return res
        .status(500)
        .send("Couldn't remove invalid quotes at this time");
    }
    //respond with no removed quotes, the removed quotes and the new cleaned quote object or an empty array and no doubles message.
    res.status(200).json(outcome);
  } catch (err) {
    res
      .status(500)
      .send(`Couldn't delete quotes at this time: ${err}`);
  }
});
