const fs = require('fs');

const determineType = (fileName) => {
  const index = fileName.lastIndexOf('.');
  const suffix = fileName.slice(index + 1);
  if (suffix === 'html') {
    return 'text/html';
  }
  if (suffix === 'jpg') {
    return 'image/jpg';
  }
};

const serveFileContent = function (request, response) {
  const fileName = request.uri === '/' ? '/index.html' : request.uri;
  const path = `./public${fileName}`;

  if (!fs.existsSync(path)) {
    return false;
  }

  const content = fs.readFileSync(path);
  response.setHeaders('content-type', determineType(path));
  response.send(content);
  return true;
};

module.exports = { serveFileContent };
