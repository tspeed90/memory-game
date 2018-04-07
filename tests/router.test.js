const supertest = require('supertest');
const test = require('tape');
const {router} = require('../src/router');
const nock = require('nock');
const dummy = require('./testDummy.json');
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

test('check that apiHandler function returns an array with 8 items', (t) => {
  nock("https://pixabay.com/api/")
      .get(`/?key=${process.env.API_KEY}&q=nature&editors_choice=true&page=1`)
      .reply(200, dummy);

  supertest(router)
      .get('/api/')
      .expect(200)
      .expect('Content-Type', /json/)
        .end((err, res) => {
          t.error(err);
          t.deepEqual(res.body.length, 8, 'Should return an array with 8 items');
          t.end()
        });
});


test('check that apiHandler returns no null values', (t) => {
  nock("https://pixabay.com/api/")
      .get(`/?key=${process.env.API_KEY}&q=nature&editors_choice=true&page=1`)
      .reply(200, dummy);

  supertest(router)
      .get('/api/')
      .expect(200)
      .expect('Content-Type', /json/)
        .end((err, res) => {
          t.error(err);
          t.deepEqual(res.body.filter(item => item == null), [], 'Array should be empty');
          t.end()
        });
});

test('check that apiHandler returns no undefined values', (t) => {
  nock("https://pixabay.com/api/")
      .get(`/?key=${process.env.API_KEY}&q=nature&editors_choice=true&page=1`)
      .reply(200, dummy);

  supertest(router)
      .get('/api/')
      .expect(200)
      .expect('Content-Type', /json/)
        .end((err, res) => {
          t.error(err);
          t.deepEqual(res.body.filter(item => item == undefined), [], 'Array should be empty');
          t.end()
        });
});