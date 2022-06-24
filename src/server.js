const { createServer } = require('net');
const { parseRequest } = require("./parseRequest.js");
const { Response } = require("./response.js");
const { serveFileContent } = require('./serveFileContents.js');

const onNewConnection = (socket, handler) => {
  const response = new Response(socket);
  socket.on('data', (chunk) => {
    const lines = chunk.toString().split('\r\n')
    const request = parseRequest(lines);
    handler(response, request);
  }
  );
}

const server = createServer((socket) => onNewConnection(socket, serveFileContent));
const PORT = 8111;
server.listen(PORT, () => console.log('listening on port ', PORT));
