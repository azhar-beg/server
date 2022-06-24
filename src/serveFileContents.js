const fs = require('fs');
const html = content => `<html><body>${content}</body></html>`;

const determineType = (fileName) => {
  const index = fileName.lastIndexOf('.');
  const suffix = fileName.slice(index + 1);

  if (suffix === 'html') {
    return 'html';
  }

  if (suffix === 'jpg') {
    return 'jpg';
  }
};

const serveFileContent = function (response, request) {
  const { uri } = request;
  let fileName = './public' + uri;

  if (uri === '/') {
    response.setHeaders('content-type', 'html')
    fileName = './public/index.html';
  }

  if (fs.existsSync(fileName)) {
    const content = fs.readFileSync(fileName);
    response.setHeaders('content-type', determineType(fileName));
    response.send(content);
    return;
  }
  response.statusCode = 404;
  response.send(html('Bad Request'));
};

module.exports = { serveFileContent };
