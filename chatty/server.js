/*
 * Purpose: This server runs the Chatty application.
 * Author: Justin Nichols
 * Class: CSC337
 */

const express = require('express');
const mongoose = require('mongoose');
const parser = require('body-parser');

const host = '64.227.49.233';
const port = 80;

const app = express();
const db = mongoose.connection;
const mongoDBURL = `mongodb://${host}/chats`;

mongoose.connect(mongoDBURL, { useNewUrlParser: true });
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

var Schema = mongoose.Schema;
var ChatMessageSchema = new Schema({
  time: Number,
  alias: String,
  message: String
});
var ChatMessage = mongoose.model('ChatMessage', ChatMessageSchema );

app
  .use(express.static('public_html'))
  .get('/chats', (req, res) => res.redirect('/index.html'))
  .post('/chats/post', (req, res) => res.redirect('/'))
  .all('*', (req, res) => res.redirect('/'))
  .listen(port, () => console.log('App listening'))
