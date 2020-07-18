/*
 * Purpose: Provides functionality for sending messages.
 * Author: Justin Nichols
 * Class: CSC337
 */

function send() {
  $.ajax({
    url: '/chats/post',
    data: { alias: $('#input_alias').val(),
      msg: $('#input_msg').val() },
    method: 'POST',
    success: () => console.log({ alias: $('#input_alias').val(),
      msg: $('#input_msg').val() })
  });
}
