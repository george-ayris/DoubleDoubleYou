// The simpler of the two sets of tests
// Here we're using a test framework called jest. It runs the tests for us,
// provides us a structure for our tests and gives us a way to mock bits of our
// app that we don't want to test e.g. in our test we don't have a real
// websockets connection so we have a mock that does nothing and then we can
// check in our test that the correct functions were called.

// Have a look here for the reference and some useful examples
// http://facebook.github.io/jest/docs/api.html#content

// jest automatically mocks all require('..') calls unless you tell it otherwise
// since we're testing chatServer we want the real chatServer and a not a mock
// so we tell jest not to mock it
jest.dontMock('../chatServer');
var chatServer = require('../chatServer');

// This is a test suite (i.e. a set of tests with common setup) usually they
// have more than one 'it' section. The first argument ('send') allows us to
// describe what functionallity we're testing here. The function is run
// by the jest test runner.
describe('send', function() {
  // Create a mock function - it does nothing and remembers how many times it
  // was called and with what arguments. This will replace sockets.emit()
  var mockEmit = jest.genMockFunction();
  // Create an object that we can pass into our chatServer pretending to be
  // the real io.sockets
  var sockets = { emit: mockEmit };
  // What the data would look like (as it's forwarded on straight from the client)
  var data = { message: 'Test message' };

  // The function under test
  chatServer.send(data, sockets);

  // Check the correct things happen
  it('forwards on the data', function() {
    // Assert that the mock function was called once
    // jest uses expect(value under test).toBe(what the value should be);
    expect(mockEmit.mock.calls.length).toBe(1);
    // Assert that the first argument to the first function call on the mock
    // is 'message'. expect().toBe() does a comparison using '=='
    expect(mockEmit.mock.calls[0][0]).toBe('message');
    // Check that the second argument to the first function call is the data
    expect(mockEmit.mock.calls[0][1]).toBe(data);
  });
});

// Second test suite for disconnect
describe('disconnect', function() {
  // As above, but here we want to mock socket.broadcast.emit() instead of
  // sockets.emit()
  var mockEmit = jest.genMockFunction();
  var socket = { broadcast: { emit: mockEmit }};
  // Act like register() has alredy been called
  var username = "Gumbo";
  socket.username = username;

  // Call the method under test
  chatServer.disconnect(socket);

  it('broadcasts a disconnect message', function() {
    // expect socket.broadcast.emit() to be called once
    expect(mockEmit.mock.calls.length).toBe(1);
    // call 1 - argument 1
    expect(mockEmit.mock.calls[0][0]).toBe('message');
    // call 1 - argument 2
    expect(mockEmit.mock.calls[0][1]).toEqual({ message: username + ' left the chat' });
  });
});

// Need to write tests for the register function - feel free to give it a crack.
