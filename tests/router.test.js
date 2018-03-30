const supertest = require('supertest');
const test = require('tape');
const {router} = require('../src/router');
const nock = require('nock');
require('dotenv').config();


test('check status code is 200', (t) => {
  supertest(router)
  .get('/')
  .expect(200)
  .expect('Content-Type', /html/)
    .end((err, res) => {
      t.error(err);
      t.equal(res.statusCode, 200, 'check status code is 200');
      t.end()
    });
});

test('check for status code of 404', (t) => {
  supertest(router)
  .get('/fjdkafe')
  .expect(404)
  .expect('Content-Type', /html/)
    .end((err, res) => {
      t.error(err);
      t.equal(res.statusCode, 404, 'check for status code of 404');
      t.end();
    });
});

test('check that api returns an object with the name property and value', (t) => {
  nock("https://pixabay.com/api/")
      .get(`/?key=${process.env.API_KEY}&q=textures&order=popular&page=1`)
      .reply(200, 
        {
          totalHits: 500,
          hits: [{
            largeImageURL: "https://pixabay.com/get/ea37b60c2ff1043ed1584d05fb1d4e93e776ead41cac104497f2c57da3ebb1bc_1280.jpg",
            webformatHeight: 426,
            webformatWidth: 640,
            imageWidth: 5184,
            pageURL: "https://pixabay.com/en/stone-rock-model-texture-gravel-3273755/",
            imageHeight: 3456,
            webformatURL: "https://pixabay.com/get/ea37b60c2ff1043ed1584d05fb1d4e93e776ead41cac104497f2c57da3ebb1bc_640.jpg",
            type: "photo",
            imageSize: 6635972,
            userImageURL: "https://cdn.pixabay.com/user/2017/11/29/21-12-13-226_250x250.jpg",
            previewURL: "https://cdn.pixabay.com/photo/2018/03/29/21/35/stone-3273755_150.jpg"
          }]
        }
      );

  supertest(router)
      .get('/api/')
      .expect(200)
      .expect('Content-Type', /json/)
        .end((err, res) => {
          t.error(err);
          t.deepEqual(res.body, ["https://pixabay.com/get/ea37b60c2ff1043ed1584d05fb1d4e93e776ead41cac104497f2c57da3ebb1bc_1280.jpg"], 'object should contain name value and property');
          t.end()
        });
});