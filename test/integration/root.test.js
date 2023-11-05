const supertest = require("supertest");
const app = require('../../backend/index');

describe('Integration test', () => {
    it('should return a 404 status code', (done) => {
        supertest(app)
          .get('/api/') 
          .expect(404)
          .end((err, res) => {
            if (err) return done(err);
            done();
          });
    });
});