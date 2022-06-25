const html = content => `<html><body>${content}</body></html>`;

const serveHomePage = function (request, response) {
  const { uri } = request;
  if (uri === '/') {
    response.send(html('Welcome to page'));
    return true;
  }
  return false;
};

module.exports = { serveHomePage };
