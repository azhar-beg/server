const assert = require('assert');
const { Response } = require('../src/response.js');

const mockSocket = function (actual) {
  const write = x => actual.push(x);
  const end = x => x;
  return { write, end };
};

describe('Response', () => {
  it('message', () => {
    const actual = [];
    const socket = mockSocket(actual);
    const response = new Response(socket);
    const content = '<html><body>Welcome</body></html>';
    response.send(content);
    const expected = [
      'HTTP/1.1 200 ok\r\n',
      'content-length:33\r\n',
      '\r\n',
      '<html><body>Welcome</body></html>'
    ];

    assert.deepStrictEqual(actual, expected);
  });
});
