const { createServer } = require('net');
const { handler } = require("./handlers.js");
const { parseRequest } = require("./parseRequest.js");
const { Response } = require("./response.js");

const onNewConnection = (socket, handler) => {
  socket.setEncoding('utf8');
  const response = new Response(socket);
  socket.on('data', (chunk) => {
    const lines = chunk.split('\r\n')
    const request = parseRequest(lines);
    handler(response, request);
  }
  );
}

const server = createServer((socket) => onNewConnection(socket, handler));
const PORT = 8111;
server.listen(PORT, () => console.log('listening on port ', PORT));
