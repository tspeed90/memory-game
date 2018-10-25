const { staticHandler, notFoundHandler, apiHandler } = require('./handlers');

const router = (request, response) => {
  const url = request.url;

  if (url === '/') {
    staticHandler(response, 'public/index.html');
  } else if (url.indexOf('/public/') !== -1) {
    staticHandler(response, url);
  } else if (url.indexOf('/dist/') !== -1) {
    staticHandler(response, url);
  } else if (url.indexOf('/api/') !== -1) {
    apiHandler(response);
  } else {
    notFoundHandler(response);
  }
};

module.exports = { router };
