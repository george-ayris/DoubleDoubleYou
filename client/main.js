// Conceptually the first/main file loaded by the browser
// In reality only one file is - bundle.js

// Execute this function when the window has loaded
window.onload = function() {
  var messages = [];

  // Require in our clientside chat 'module' - separated out for clarity and
  // testability
  var registerUsername = require('./chat.js');
  // Get some bits of the DOM (i.e. the html tree structure) that will be useful
  // to us
  var messageInput = document.getElementById('message-input');
  var sendButton = document.getElementById('send');
  var chatWindow = document.getElementById('chat-window');
  var onlineList = document.getElementById('online-list');

  // Call the function exported by chat.js, which we've named registerUsername,
  // with the result of the prompt asking for the user's name. registerUsername
  // returns us some functions that have that username built into them so we
  // don't need to keep passing it in.
  var chatClient = registerUsername(prompt('Please enter your name:', ''));

  // This function allows us to setup a callback we receive a socket message
  // labelled 'message' - look inside chat.js
  chatClient.registerOnMessage(function(data) {
    // Add the message contents to the innerHTML of our chat window div
    if(data.username) {
      if (data.message) {
        chatWindow.innerHTML += data.username + ': ' + data.message + '<br />';
      }
    } else {
      chatWindow.innerHTML += data.message + '<br />';
    }
    if(data.users) {
      var list = '';
      for (user in data.users) {
        list += data.users[user] + '<br />';
      }
      onlineList.innerHTML = list;
    } 
  });

  // When the send button is clicked call the function
  sendButton.onclick = function() {
    // Pass the value of the input box to our chatClient
    chatClient.sendMessage(messageInput.value);
    // Remove the contents of the input box
    messageInput.value = '';
  };

  // Make pressing the enter button, when focused on the input box, click the
  // send button
  messageInput.onkeypress = function(event) {
    event = event || window.event;
    if(event.keyCode == 13) {
      sendButton.click();
    }
  };
};
