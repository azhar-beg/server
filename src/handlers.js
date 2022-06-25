const { Stocks } = require("./stock.js");
const fs = require('fs');

const html = content => `<html><body>${content}</body></html>`;

const serveHomePage = function (request, response) {
  const { uri } = request;
  if (uri === '/') {
    response.send(html('Welcome to stock page'));
    return true;
  }
  return false;
};

const readStock = () => {
  const stocksReading = JSON.parse(fs.readFileSync('./src/stocks.json', 'utf8'));
  const stocks = new Stocks();
  stocksReading.forEach((s) => {
    stocks.addStock(s.name, s.price, 200);
  });
  return stocks;
}
const addStock = (stocks) => (request, response) => {
  request.stocks = stocks;
  return false;
}

const serveStockPage = (request, response) => {
  const { uri, stocks } = request;
  const stock = uri.slice(1);
  if (stocks.isListed(stock)) {
    response.send(stocks.stockDetails(stock));
    return true
  }
  return false;
};

module.exports = { addStock, serveHomePage, serveStockPage };
