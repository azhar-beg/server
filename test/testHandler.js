const assert = require('assert');
const { serveHomePage } = require('../src/handlers.js');
const { Response } = require('../src/response.js');

const mockSocket = function (actual) {
  const write = x => actual.push(x);
  const end = x => x;
  return { write, end };
};

describe('handleReq', () => {
  it('Should handle given request', () => {
    const actual = [];
    const socket = mockSocket(actual);
    const response = new Response(socket);
    const expected = ['HTTP/1.1 200 ok\r\n',
      'content-length:47\r\n',
      '\r\n',
      '<html><body>Welcome to stock page</body></html>'];

    serveHomePage({
      uri: '/'
    }, response);
    assert.deepStrictEqual(actual, expected)
  });

  it('Should handle given request for wrong url', () => {
    const actual = [];
    const socket = mockSocket(actual);
    const response = new Response(socket);
    const expected = [];
    serveHomePage({
      uri: '/index.html'
    }, response);
    assert.deepStrictEqual(actual, expected)
  });
});