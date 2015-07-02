jest.dontMock('../chatServer');

describe('send', function() {
  it('forwards on the data', function() {
    var chatServer = require('../chatServer');
    var mockEmit = jest.genMockFunction();
    var sockets = { emit: mockEmit };
    var data = { message: 'Test message' };

    chatServer.send(data, sockets);

    expect(mockEmit.mock.calls.length).toBe(1);
    expect(mockEmit.mock.calls[0][0]).toBe('message') // first arg
    expect(mockEmit.mock.calls[0][1]).toBe(data); // second arg
  });
});
