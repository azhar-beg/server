const { serveFileContent } = require('./src/serveFileContents.js');
const { startServer } = require('./src/server');

startServer(8111, serveFileContent);
