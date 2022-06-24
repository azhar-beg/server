const { createServer } = require('net');
const { parseRequest } = require("./parseRequest.js");
const { Response } = require("./response.js");

const onNewConnection = (socket, handler) => {
  const response = new Response(socket);
  socket.on('data', (chunk) => {
    const lines = chunk.toString().split('\r\n')
    const request = parseRequest(lines);
    handler(response, request);
  }
  );
}

const startServer = function (PORT, handler) {
  const server = createServer((socket) => onNewConnection(socket, handler));
  server.listen(PORT, () => console.log('listening on port ', PORT));
};

exports.startServer = startServer;
