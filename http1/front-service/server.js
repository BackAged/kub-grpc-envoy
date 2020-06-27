'use strict';

const express = require('express');
const axios = require('axios');

// Constants
const PORT = 8000;
const HOST = '0.0.0.0';

// Env
const serviceAURL = `http://${process.env.serviceAURL}`;

// App
const app = express();
app.get('/', async(req, res) => {
  console.log(serviceAURL)
  console.log(`calling ${serviceAURL}`);
  const response = await axios.get(serviceAURL);
  res.send(response.data);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);