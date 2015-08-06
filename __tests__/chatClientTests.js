// Look at chatServerTests.js first because it's simpler.

// don't mock the module under test
// second dontMock() is to allow us to use a custom mock because the automatic
// mock provided by jest doesn't quite cut it
// the setMock does the substitution of the real module for our custom mock
jest
  .dontMock('../client/chat')
  .dontMock('../__mocks__/socket.io-client')
  .setMock('socket.io-client', require('../__mocks__/socket.io-client'));

describe('send message', function() {
  // module under test
  var chatClientRegister = require('../client/chat');
  // our custom socket mock
  var socketMock = require('../__mocks__/socket.io-client');
  var message = "Long live King Richard!";
  var username = "Robin Hood";

  // do this before each of the it functions are called
  // the reset means that they are not affected by each other/the order that
  // they are run in.
  // the chatClientRegister() is what returns the object of functions that
  // we want to test
  beforeEach(function() {
    socketMock.resetMock();
    chatClient = chatClientRegister(username);
  });

  it('registers the user with the server', function() {
    chatClient.sendMessage(message);

    // get the first function call performed on the mock
    var registerSocketCall = socketMock.emit.mock.calls[0];
    // first arg
    expect(registerSocketCall[0]).toEqual('register');
    // second arg
    expect(registerSocketCall[1].username).toEqual(username);
  });

  it('sends the message with correct username', function() {
    chatClient.sendMessage(message);

    // get second function call on mock - first is the register (as seen above)
    // second is the send that we want to test
    var sendMessageSocketCall = socketMock.emit.mock.calls[1];
    expect(sendMessageSocketCall[0]).toEqual('send');
    expect(sendMessageSocketCall[1].message).toEqual(message);
    expect(sendMessageSocketCall[1].username).toEqual(username);
  });

  /* TEST FOR USERLIST UPDATE
  it('adds the username to the list of online users', function() {

  });*/

  // this test is why we want our custom socket mock
  // we want to call a function that is passed into our mock
  it('calls the callback when a message event is received', function() {
    // mock callback function to be passed in
    var mockCallback = jest.genMockFunction();
    // pass in function
    chatClient.registerOnMessage(mockCallback);
    // pretend a 'message' event is received from the server
    // if you look inside the socket mock this calls the function registered
    // against the 'message' tag.
    socketMock.messageEventReceived();
    // check that the registerOnMessage() performed a socket.on('message', callback)
    // and therefore the callback was called when we did messageEventReceived()
    expect(mockCallback.mock.calls.length).toBe(1);
  });

  /* TEST FOR USER LIST ON MESSAGE
  it("doesn't affect the user list", function() {

  });*/

});

/* TESTS FOR DISCONNECTION EVENTS
describe('close tab', function() {


  /* 
  it('tells remaining users that the person has left', function() {

  });

  /*
  it('updates the online user list', function() {

  });
});*/
