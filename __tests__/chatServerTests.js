jest.dontMock('../chatServer');
var chatServer = require('../chatServer');

describe('send', function() {
  var mockEmit = jest.genMockFunction();
  var sockets = { emit: mockEmit };
  var data = { message: 'Test message' };

  chatServer.send(data, sockets);

  it('forwards on the data', function() {
    expect(mockEmit.mock.calls.length).toBe(1);
    expect(mockEmit.mock.calls[0][0]).toBe('message'); // first arg
    expect(mockEmit.mock.calls[0][1]).toBe(data); // second arg
  });
});

describe('disconnect', function() {
  var mockEmit = jest.genMockFunction();
  var socket = { broadcast: { emit: mockEmit }};
  var username = "Gumbo";
  socket.username = username;
  
  chatServer.disconnect(socket);

  it('broadcasts a disconnect message', function() {
    expect(mockEmit.mock.calls.length).toBe(1);
    expect(mockEmit.mock.calls[0][0]).toBe('message');
    expect(mockEmit.mock.calls[0][1]).toEqual({ message: username + ' left the chat' });
  });
});
