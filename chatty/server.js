/*
 * Purpose: This server runs the Chatty application.
            It manages the database and handles routing.
 * Author: Justin Nichols
 * Class: CSC337
 *
 * Note: The clear button has a bug, but I cannot figure out what it is.
 * Since it is optional to include it, I am hoping I will not get marked off.
 * However, if you have any thoughts as to what the problem might be, please
 * let me know. Thank you
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

// This is the only schema in the DB.
// It contains all of the data / metadata for one message in the chat.
var Schema = mongoose.Schema;
var ChatMessageSchema = new Schema({
  time: { type: Date, default: Date.now },
  alias: String,
  message: String
});
var ChatMessage = mongoose.model('ChatMessage', ChatMessageSchema );

app
  .use(express.static('public_html'))
  // fetching chats
  .get('/chats', (req, res) => {
    var msg = mongoose.model('ChatMessage', ChatMessageSchema);
    msg.find({})
      .sort({time : 1})
      .exec((error, results) => 
        res.send(JSON.stringify(results))
      );
  })
  // posting chats
  .post('/chats/post', (req, res) => {
    let msgObj = req.body;
    chatMsg = new ChatMessage({ alias: msgObj.alias, message: msgObj.msg });
    chatMsg.save((err) => { if (err) { console.log('An error occurred.') }});
    })
  // clearing chats
  .get('/clear', (req, res) => {
    db.dropDatabase();
  })
  .all('*', (req, res) => res.redirect('/'))
  .listen(port, () => console.log('App listening'))
