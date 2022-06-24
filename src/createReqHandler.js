const { serveHomePage, serveStockPage } = require('./handlers.js');
const { notFound } = require('./notFoundHandler.js');
const { serveFileContent } = require('./serveFileContents.js');

const createReqHandler = handlers => (request, response) => {
  for (const handler of handlers) {
    if (handler(request, response)) {
      return true;
    }
  }
}

const handlers = [serveHomePage, serveFileContent, serveStockPage, notFound];
const reqHandler = createReqHandler(handlers);

module.exports = { reqHandler };
