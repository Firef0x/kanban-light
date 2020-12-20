const fs = require('mz/fs');
const path = require('path');
const request = require('supertest');
const { expect } = require('chai');
const app = require('./app');

describe('Check if server is running normally', () => {
  it('Should return status code 200', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .end(done);
  });
});

describe('POST /upload - upload a new file', () => {
  it('Should upload the file to server', (done) => {
    const filePath = path.join(__dirname, 'www');
    console.log(`filePath: ${filePath}`);
    fs.exists(filePath)
      .then((exists) => {
        if (!exists) {
          throw new Error('file does not exist');
        }
        return request(app)
          .post('/upload')
          .attach('uploadFile', filePath)
          .then((res) => {
            const { status, text } = res;
            console.log(`res: ${JSON.stringify(res)}`);
            expect(status).to.equal(200);
            expect(text).to.equal('OK');
            done();
          })
          .catch((err) => {
            console.log(err);
            done(err);
          });
      });
  });
});
