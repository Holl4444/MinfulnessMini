// Set up express
import express from 'express';
const app = express();
app.use(express.json());
const PORT = 5001;
import http from 'http';
const server = http.createServer(app);

import { getQuotes } from './helpers.js';

app.get('/', function (req, res) {
  try {
    res.status(200).send("Hi! How're you feeling?");
  } catch (err) {
    res.status(500).send("Some bad juju on our end");
  }
});

// Get all quotes
app.get('/quotes', async function (req, res) {
  try {
    const quotes = await getQuotes();
    res.status(200).json(quotes);
  } catch (err) {
    res.status(502).send("Bad Gateway");
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// Error handling
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use.`);
    // Optionally, you could attempt to listen on a different port or exit the application
    process.exit(1); // Exit the process with a failure code
  } else {
    console.error(`Server error: ${err}`);
    process.exit(1); // Exit the process with a failure code for other errors
  }
});
