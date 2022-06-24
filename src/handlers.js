const html = content => `<html><body>${content}</body></html>`;

const serveHomePage = function (request, response) {
  const { uri } = request;
  if (uri === '/') {
    response.send(html('Welcome to stock page'));
    return true;
  }
  return false;
};

const serveStockPage = function (request, response) {
  const { uri } = request;
  if (uri === '/stock') {
    response.send(html('Welcome to stock page'));
    return true
  }
  return false;
};

module.exports = { serveHomePage, serveStockPage };
