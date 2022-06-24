const { createServer } = require('net');
const { reqHandler } = require('./src/createReqHandler');
const { onNewConnection } = require('./src/server');

const startServer = function (PORT, requestHandler) {
  const server = createServer((socket) => onNewConnection(socket, requestHandler));
  server.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
};

startServer(8111, reqHandler);
