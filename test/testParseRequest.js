const assert = require('assert');
const { parseRequest, parseHeaders } = require('../src/parseRequest.js');

describe('parseRequest', () => {
  it('should pass given request', () => {
    const input = ['GET / HTTP/1.1', 'Host: localhost: 8111']
    const expected = {
      method: 'GET', uri: '/', httpVersion: 'HTTP/1.1',
      headers: {
        host: 'localhost: 8111',
      },
    }
    assert.deepStrictEqual(parseRequest(input), expected);
  });

  it('should pass given request for more than 2 headers', () => {
    const input = ['GET / HTTP/1.1', 'Host: localhost: 8111', 'User-agent: google']
    const expected = {
      method: 'GET', uri: '/', httpVersion: 'HTTP/1.1',
      headers: {
        host: 'localhost: 8111',
        'user-agent': 'google',
      },
    }
    assert.deepStrictEqual(parseRequest(input), expected);
  });
});

describe('parseHeaders', () => {
  it('should parse the given headers', () => {
    const input = ['Host: localhost: 8111', 'User-agent: google'];
    const expected = { host: 'localhost: 8111', 'user-agent': 'google' };
    assert.deepStrictEqual(parseHeaders(input), expected);
  });
});