/*
 * Purpose: This server runs the Chatty application.
 * Author: Justin Nichols
 * Class: CSC337
 */

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const host = '64.227.49.233';
const port = 80;

const app = express();
const db = mongoose.connection;
const mongoDBURL = 'mongodb://localhost/chats';

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(mongoDBURL, { useNewUrlParser: true });
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

var Schema = mongoose.Schema;
var ChatMessageSchema = new Schema({
  time: { type: Date, default: Date.now },
  alias: String,
  message: String
});
var ChatMessage = mongoose.model('ChatMessage', ChatMessageSchema );

app
  .use(express.static('public_html'))
  .get('/chats', (req, res) => {
    var msg = mongoose.model('ChatMessage', ChatMessageSchema);
    msg.find({})
      .sort({time : 1})
      .exec((error, results) => 
        res.send(JSON.stringify(results))
      );
  })
  .post('/chats/post', (req, res) => {
    let msgObj = req.body;
    chatMsg = new ChatMessage({ alias: msgObj.alias, message: msgObj.msg });
    chatMsg.save((err) => console.log('An error occurred.'));
    })
  .all('*', (req, res) => res.redirect('/'))
  .listen(port, () => console.log('App listening'))
