const supertest = require("supertest");
const app = require('../../backend/index');

describe('Integration test authentication', () => {

    // it('should signup for a user', (done) => {

    //     const data = {
    //         firstName: "Test",
    //         lastName: "Testing",
    //         email:"test@gmail.com",
    //         password:"Test1234@"
    //     };

    //     supertest(app)
    //       .post('/api/users') 
    //       .send( data ) 
    //       .expect(201)
    //       .end((err, res) => {
    //         if (err) return done(err);
    //         done();
    //       });

    //       done();
    // });
    it('should handle existing user during signup', () => {
        const existingUserData = {
          firstName: "Existing",
          lastName: "User",
          email: "test@gmail.com",
          password: "Test1234@"
        };
      
        supertest(app)
          .post('/api/users')
          .send(existingUserData)
          .expect(400) 
          .end((err, res) => {
            if (err) console.log(err);
          });
    });
    it('should successfully log in for a user', () => {

        const data = {
            email:"test@gmail.com",
            password: "Test1234@"
        };

        supertest(app)
          .post('/api/auth') 
          .send( data ) 
          .expect(200)
          .end((err, res) => {
            if (err) console.log(err);
          });

          
    });
    it('should handle invalid login credentials', () => {
        const invalidCredentials = {
          email: "test@gmail.com",
          password: "IncorrectPassword"
        };
      
        supertest(app)
          .post('/api/auth')
          .send(invalidCredentials)
          .expect(401) // Expect a 401 Unauthorized status
          .end((err, res) => {
            if (err) console.log(err);
          });
          
      });
      
});