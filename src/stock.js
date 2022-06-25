const between = (min, max) => Math.random() * (max - min) + min;

// class Stock {
//   constructor(name, price, delta)
// }

class Stocks {
  #stocks
  constructor() {
    this.#stocks = [];
  }

  addStock(name, price, delta) {
    const stock = {};
    stock.name = name;
    stock.price = price;
    stock.delta = delta;
    this.#stocks.push(stock);
  }

  #currentPrice({ price, delta }) {
    return price + +between(-delta, +delta).toFixed(3);
  }

  isListed(stockName) {
    return this.#stocks.some(({ name }) => name === stockName);
  }

  stockDetails(stockName) {
    const stock = this.#stocks.find(({ name }) => name === stockName);
    const price = this.#currentPrice(stock)
    return `name: ${stockName}\nprice: ${price}`;
  }
}

module.exports = { Stocks };
