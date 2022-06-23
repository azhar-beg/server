const assert = require('assert');
const { handler } = require('../src/handlers');

const mockSocket = function (actual) {
  const write = x => actual.push(x);
  return { send: write };
};

describe('handleReq', () => {
  it('Should handle given request', () => {
    const actual = [];
    const socket = mockSocket(actual);
    const expected = [`<html><body>Welcome</body></html>`]
    handler(socket, {
      uri: '/'
    });
    assert.deepStrictEqual(actual, expected)
  });
});