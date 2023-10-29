const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const {
    generateSalt,
    generateHashPassword,
    loginUser,
    findUser,
    createNewUser
} = require('../../backend/controller/authentication.controller');

const {User} = require('../../backend/models/user');

describe('authentication bcrypt controller', () => {
    it('should generate a salt', async () => {
        const salt = await generateSalt();
        expect(salt).to.be.a('string');
    });

    it('should generate a hashed password', async () => {
        const salt = await generateSalt();
        const req = {
            body : {
               password: "12345" 
            }
        }
        const hashedPassword = await generateHashPassword(req, salt);
        expect(hashedPassword).to.be.a('string');
    });
});

describe('authentication findUser controller', () => {
    it('should find a user by email', async () => {
      const sampleUser = { email: 'test@example.com', password:'12345' };
      const findOneStub = sinon.stub(User, 'findOne').resolves(sampleUser);
  
      const req = { body: { email: 'test@example.com' } };
  
      const user = await findUser(req);
  
      expect(findOneStub.calledOnce).to.be.true;
      expect(findOneStub.firstCall.args[0]).to.deep.equal({ email: 'test@example.com' });
      expect(user).to.deep.equal(sampleUser);
  
      findOneStub.restore();
    });
  
    it('should handle the case where no user is found', async () => {
      const findOneStub = sinon.stub(User, 'findOne').resolves(null);
  
      const req = { body: { email: 'nonexistent@example.com' } };
  
      const user = await findUser(req);
  
      expect(findOneStub.calledOnce).to.be.true;
      expect(findOneStub.firstCall.args[0]).to.deep.equal({ email: 'nonexistent@example.com' });
  
      expect(user).to.be.null;
  
      findOneStub.restore();
    });
  });


  describe('authentication createNewUser controller', () => {
    it('should create a new user with the provided request body and hash password', async () => {

    const saveStub = sinon.stub(User.prototype, 'save').resolves();
  
      const req = {
        body: {
            firstName: 'Test',
            lastName: 'Test',
            email: 'test@example.com'        },
      };
  
      const hashedPassword = 'hashed_password'; 
  
      await createNewUser(req, hashedPassword);
  
      expect(saveStub.calledOnce).to.be.true;
      const savedUser = saveStub.firstCall.thisValue;
      expect(savedUser).to.be.an.instanceOf(User);
  
      saveStub.restore();
    });
  });