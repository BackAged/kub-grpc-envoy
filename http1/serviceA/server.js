'use strict';

const express = require('express');
const { lookup } = require('dns').promises;
const { hostname } = require('os');

// Constants
const PORT = 8000;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', async(req, res) => {
  const host = (await lookup(hostname(), {}))
    .address;
  res.send('Hello World from: ' +host);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);