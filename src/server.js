const { createServer } = require('net');
const { parseRequest } = require("./parseRequest.js");


const onNewConnection = (socket) => {
  socket.setEncoding('utf8');
  socket.write('connected');
  socket.on('data', (chunk) => {
    const lines = chunk.split('\r\n')
    const request = parseRequest(lines);
    console.log(request);
    socket.end();
  }
  );
}

const server = createServer((socket) => onNewConnection(socket));
const PORT = 8111;
server.listen(PORT, () => console.log('listening on port ', PORT));
