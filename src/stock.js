const between = (min, max) => Math.random() * (max - min) + min;
const randNth = (possibilities) => possibilities[Math.floor(Math.random() * possibilities.length)];
const percentageDifference = (num1, num2) => {
  const diff = num2 - num1;
  return ((diff / num1) * 100).toFixed(3);
}


const next = (model, current) => {
  const possibilities = model[current];
  return randNth(possibilities);
}

class Stocks {
  #stocks
  constructor() {
    this.#stocks = {};
  }

  addStock(stock) {
    this.#stocks[stock.name] = stock;
  }

  isListed(stockName) {
    return this.#stocks[stockName];
  }

  #updateStock(stock, price) {
    stock.price = price;
  }

  stockDetails(name) {
    const stock = this.#stocks[name]
    const { price, delta, opening } = stock;
    const current = next(delta, price)
    this.#updateStock(stock, current);
    const change = percentageDifference(opening, current);
    return `name: ${name}\nopening price: ${opening}\nprice: ${current}\nchange: ${change}`;
  }
}

module.exports = { Stocks };
