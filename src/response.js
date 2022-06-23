const response = (content, code) => `HTTP/1.1 ${code}\r\n\r\n${content}\r\n`;

class Response {
  #socket;
  #statusCode;
  constructor(socket) {
    this.#socket = socket;
    this.#statusCode = 200;
  }

  set statusCode(code) {
    this.#statusCode = code;
  }

  write(content) {
    this.#socket.write(content);
    this.#socket.end();
  }

  send(content) {
    this.#socket.write(response(content, this.#statusCode));
  }
}

module.exports = { Response };
