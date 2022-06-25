const { serveHomePage } = require('./handlers.js');
const { notFound } = require('./notFoundHandler.js');
const { serveFileContent } = require('./serveFileContents.js');

const createReqHandler = handlers => (request, response) => {
  for (const handler of handlers) {
    if (handler(request, response)) {
      return true;
    }
  }
}

const handlers = [serveHomePage, serveFileContent, notFound];
const reqHandler = createReqHandler(handlers);

module.exports = { reqHandler };
