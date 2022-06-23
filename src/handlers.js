const html = content => `<html><body>${content}</body></html>`;

const handleReq = function (response, request) {
  if (request.uri === '/') {
    response.send(html('Welcome'));
    return;
  }
  response.statusCode = 404;
  response.send(html('Bad Request'));
};

exports.handler = handleReq;
