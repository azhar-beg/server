const { serveHomePage, serveStockPage, addStock } = require('./handlers.js');
const { notFound } = require('./notFoundHandler.js');
const { serveFileContent } = require('./serveFileContents.js');
const fs = require('fs');
const { Stocks } = require('./stock.js');

const readStock = () => {
  const stocksLog = JSON.parse(fs.readFileSync('./src/stocks.json', 'utf8'));
  const stocks = new Stocks();
  stocksLog.forEach((s) => {
    stocks.addStock(s.name, s.price, 200);
  });
  return stocks;
}

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
