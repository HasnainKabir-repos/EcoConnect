const supertest = require("supertest");
const app = require('../../backend/index');
const { assert } = require("chai");


describe('Integration test location', () => {
    it('should return 200 response when fetching autocomplete data based on a text', () => {
        const data = {
            input: "Shantinagar"
        };

        supertest(app)
            .post('/api/location/search')
            .send(data)
            .expect(200)
            .end((err, res) => {
                if (err) console.log(err);
                assert.equal(res.status, 200);
            });
    });

    it('should return 200 response when fetching details based on a place_id', () => {
        const data = {
            place_id: "ChIJHWQBQ525VTcRNgbcwue5oEA",
            description: "Shantinagar Mour, Bir Uttam Samsul Alam Road, Dhaka, Bangladesh"
        };
        supertest(app)
            .post('/api/location/details')
            .send(data)
            .expect(200)
            .end((err, res) => {
                if (err) console.log(err);
                assert.equal(res.status, 200);
            });
    });

    
})