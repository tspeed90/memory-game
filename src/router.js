const { staticHandler } = require('./handler');

const router = (request, response) => {
  const url = request.url;

  if (url === "/") {
    staticHandler(response, 'public/index.html');
  } else if (url.indexOf('/public/') !== -1) {
    staticHandler(response, url)
  }
};

module.exports = {router};