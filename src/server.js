const { createServer } = require('net');
const { handler } = require("./handlers.js");
const { parseRequest } = require("./parseRequest.js");

const onNewConnection = (socket, handler) => {
  socket.setEncoding('utf8');
  socket.on('data', (chunk) => {
    const lines = chunk.split('\r\n')
    const request = parseRequest(lines);
    handler(socket, request);
    socket.end();
  }
  );
}

const server = createServer((socket) => onNewConnection(socket, handler));
const PORT = 8111;
server.listen(PORT, () => console.log('listening on port ', PORT));
