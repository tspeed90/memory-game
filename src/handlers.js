const fs = require('fs');
const path = require('path');
const request = require('request');
require('dotenv').config();

const staticHandler = (response, filepath) => {
  const extension = filepath.split('.')[1];
  const extensionType = {
    html: 'text/html',
    css: 'text/css', 
    js: 'application/javascript',
    jpg: 'image/jpg',
    png: 'image/png',
    ico: 'image/x-icon'
  };

  fs.readFile(path.join(__dirname, '..', filepath), 'binary', (error, file) => {
    if (error) {
      response.writeHead(500, {'Content-Type': 'text/html'});
      response.end("<h1>Sorry, there was a problem on our end.</h1>");
    } else {
      response.writeHead(200, {'Content-Type': extensionType[extension]});
      response.write(file, 'binary');
      response.end();
    }
  });
}

const apiHandler = (response) => {
  request(`https://pixabay.com/api/?key=${process.env.API_KEY}&q=nature&editors_choice=true&page=1`, (err, _, body) => {
    if (err) {
      console.log(err);
      response.writeHead(500,{'Content-Type': 'text/html'});
      response.end('<h1>Sorry, we had a problem.</h1>');
    } else {
      response.writeHead(200, {'Content-Type': 'application/json'});
      response.end(JSON.stringify(getImages(body)));
    }
  });
}

const getImages = (body) => {
  const data = JSON.parse(body);
  while (data.hits.length > 8) {
    const randomNum = Math.floor(Math.random() * data.hits.length);
    data.hits.splice(randomNum, 1);
  }
  let images = data.hits.map(image => image.largeImageURL);
  return images;
}

const notFoundHandler = (response) => {
  response.writeHead(404, {'Content-Type' : 'text/html'});
  response.end('<h1>Sorry, we couldn\'t find what you\'re looking for.</h1>');
}

module.exports = {
  staticHandler,
  apiHandler,
  notFoundHandler, 
  getImages
}