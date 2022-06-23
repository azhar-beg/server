const assert = require('assert');
const { handler } = require('../src/handlers');

const mockSocket = function (actual) {
  const write = x => actual.push(x);
  return { write: write };
};

describe('handleReq', () => {
  it('Should handle given request', () => {
    const actual = [];
    const socket = mockSocket(actual);
    const expected = [`HTTP/1.1 200 ok\r\n\r\n<html><body>Welcome</body></html>\r\n`]
    handler(socket, {
      uri: '/'
    });
    assert.deepStrictEqual(actual, expected)
  });
});