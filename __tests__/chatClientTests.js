jest
  .dontMock('../client/chat')
  .dontMock('../__mocks__/socket.io-client')
  .setMock('socket.io-client', require('../__mocks__/socket.io-client'));

describe('send message', function() {
  var chatClientRegister = require('../client/chat');
  var socketMock = require('../__mocks__/socket.io-client');
  var message = "Why hello thar";
  var username = "Buzz";

  beforeEach(function() {
    socketMock.resetMock();
    chatClient = chatClientRegister(username);
  });

  it('registers the user with the server', function() {
    chatClient.sendMessage(message);

    var registerSocketCall = socketMock.emit.mock.calls[0];
    expect(registerSocketCall[0]).toEqual('register');
    expect(registerSocketCall[1].username).toEqual(username);
  });

  it('sends the message with correct username', function() {
    chatClient.sendMessage(message);

    var sendMessageSocketCall = socketMock.emit.mock.calls[1];
    expect(sendMessageSocketCall[0]).toEqual('send');
    expect(sendMessageSocketCall[1].message).toEqual(message);
    expect(sendMessageSocketCall[1].username).toEqual(username);
  });

  it('calls the callback when a message event is received', function() {
    var mockCallback = jest.genMockFunction();
    chatClient.registerOnMessage(mockCallback);
    socketMock.messageEventReceived();
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
