const fs = require('fs');

const createResponse = (data, code = 200) => {
  return `HTTP/1.1 ${code} \r\n\r\n${data || ''}\r\n`;
};

const handleImage = (socket, request) => {
  if (request.uri === '/') {
    socket.write(createResponse(fs.readFileSync('./index.html', 'utf-8')));
    return;
  }
  if (request.uri === '/parrot') {
    const image = fs.readFileSync('./img/parrot.png');
    socket.write(`HTTP/1.1 200\r\ncontent-length:${image.length}\r\ncontent-type:image/jpeg\r\n\r\n`);
    socket.setEncoding('binary');
    socket.write(image);
    return;
  }
  socket.write(createResponse('Bad Request', 400));
};

const html = content => `<html><body>${content}</body></html>`;

const response = html => `HTTP/1.1 200 ok\r\n\r\n${html}\r\n`;

const handleReq = function (socket, request) {
  if (request.uri === '/') {
    socket.write(response(html('Welcome')))
    return;
  }
  socket.write(createResponse('Bad Request', 400));
};

// exports.handler = handleImage;
exports.handler = handleReq;
