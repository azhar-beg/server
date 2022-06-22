const { createServer } = require('net');


const onNewConnection = (socket) => {
  socket.setEncoding('utf8');

  socket.write('connected');
  socket.on('data', (data) => {
    console.log(data);
    socket.end();
  }
  );
}

const server = createServer((socket) => onNewConnection(socket));
const PORT = 8111;
server.listen(PORT, () => console.log('listening on port ', PORT));
