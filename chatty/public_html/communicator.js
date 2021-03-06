/*
 * Purpose: Provides functionality for sending messages.
 * Author: Justin Nichols
 * Class: CSC337
 */

/*
 * This function builds the message-history from the query data.
 * @param: result. The query data from the GET request
 */
function buildMsgHist(result) {
  let msgHist = '';
  let msgs = JSON.parse(result);
  for (i in msgs) {
    let msg = msgs[i];  
    msgHist += `<b>${msg.alias}</b>: ${msg.message}<br>`;
  }
  $('#output_area').html(msgHist);
}

/*
 * This function retrieves the messages from the chat.
 */
function update() {
  $.ajax({
    url: '/chats',
    method: 'GET',
    success: (result) => buildMsgHist(result)
  });  
}

/*
 * This function posts new messages to the chat.
 */
function send() {
  $.ajax({
    url: '/chats/post',
    data: { alias: $('#input_alias').val(),
      msg: $('#input_msg').val() },
    method: 'POST'
  });
}

/*
 * This function clears the chat messages.
 */
function clearChat() {
  $.ajax({
    url: '/clear',
    method: 'GET'
  });
}

setInterval(() => update(), 1000);
