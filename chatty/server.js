/*
 * Purpose: This server runs the Chatty application.
 * Author: Justin Nichols
 * Class: CSC337
 */

const express = require('express');
const app = express();
const host = '64.227.49.233';
const port = 80;

app
  .use(express.static('public_html'))
  .all('*', (req, res) => res.redirect('/'))
  .listen(port, () => console.log('App listening'))
