const assert = require('assert');
const { EventEmitter } = require('events');
const { onNewConnection } = require('../src/onConnection.js');

describe('onNewConnection', () => {
  it('Should serve content according to request', () => {
    const expected = [
      {
        headers: {},
        httpVersion: 'HTTP/1.1',
        method: 'GET',
        uri: '/'
      }
    ];
    const socket = new EventEmitter()
    const actual = [];
    const handler = (content) => actual.push(content);

    onNewConnection(socket, handler);
    socket.emit('data', 'GET / HTTP/1.1')
    assert.deepStrictEqual(actual, expected)
  });
});