const assert = require('assert');
const { handleReq } = require('../src/handlers.js');
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
      'content-length:33\r\n',
      '\r\n',
      '<html><body>Welcome</body></html>'];

    handleReq(response, {
      uri: '/'
    });
    assert.deepStrictEqual(actual, expected)
  });
  it('Should handle given request for wrong url', () => {
    const actual = [];
    const socket = mockSocket(actual);
    const response = new Response(socket);
    const expected = ['HTTP/1.1 404 not found\r\n',
      'content-length:37\r\n',
      '\r\n',
      `<html><body>Bad Request</body></html>`];

    handleReq(response, {
      uri: '/index.html'
    });
    assert.deepStrictEqual(actual, expected)
  });
});