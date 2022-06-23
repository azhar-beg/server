const parseRequestLine = line => {
  const [method, uri, httpVersion] = line.split(' ');
  return { method, uri, httpVersion };
};

const splitHeader = line => {
  const splitOn = line.indexOf(' ');
  const key = line.slice(0, splitOn - 1).trim().toLowerCase();
  const value = line.slice(splitOn).trim();
  return [key, value];
};

const parseHeaders = lines => {
  const headers = {};
  let index = 0;
  while (lines.length > index && lines[index].length) {
    const [header, value] = splitHeader(lines[index]);
    headers[header] = value;
    index++;
  }
  return headers;
};

const parseRequest = (lines) => {
  const { method, uri, httpVersion } = parseRequestLine(lines[0]);
  const headers = parseHeaders(lines.splice(1));
  return { method, uri, httpVersion, headers };
};

module.exports = { parseRequest, parseHeaders };
