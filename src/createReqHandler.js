const { serveHomePage, serveStockPage, addStock, readStock } = require('./handlers.js');
const { notFound } = require('./notFoundHandler.js');
const { serveFileContent } = require('./serveFileContents.js');

const createReqHandler = handlers => (request, response) => {
  for (const handler of handlers) {
    if (handler(request, response)) {
      return true;
    }
  }
}

const handlers = [addStock(readStock()), serveHomePage, serveFileContent, serveStockPage, notFound];
const reqHandler = createReqHandler(handlers);

module.exports = { reqHandler };
