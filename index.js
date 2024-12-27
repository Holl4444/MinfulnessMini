// Set up express
import express from 'express';
const app = express();
app.use(express.json());
const PORT = 5000;

import { getQuotes } from './helpers.js';

app.get('/', function (req, res) {
  res.send("Hi! How're you feeling?");
});

// Get all quotes
app.get('/quotes', async function (req, res) {
  const quotes = await getQuotes();
  res.status(200).json(quotes);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
