const supertest = require('supertest');
const test = require('tape');
const {router} = require('../src/router');
const nock = require('nock');


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
  nock('https://jsonplaceholder.typicode.com/users/9')
      .get('')
      .reply(200, 
        {
          id: 9,
          name: "Sata",
          username: "Delphine",
          email: "Chaim_McDermott@dana.io",
          address: {
            street: "Dayna Park",
            suite: "Suite 449",
            city: "Bartholomebury",
            zipcode: "76495-3109",
            geo: {
              lat: "24.6463",
              lng: "-168.8889"
            }
          }
        });

  supertest(router)
      .get('/api/')
      .expect(200)
      .expect('Content-Type', /json/)
        .end((err, res) => {
          t.error(err);
          t.deepEqual(res.body, {name: 'Sata'}, 'object should contain name value and property');
          t.end()
        });
});