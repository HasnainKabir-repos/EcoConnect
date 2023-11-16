const supertest = require("supertest");
const app = require('../../backend/index');
const assert = require('chai').assert;
require('dotenv').config({ path: './backend/.env' });
describe('My Event test', () => {

    let token;
    let eventId;
    before((done) => {
        const data = {
            email: "test@gmail.com",
            password: "Test1234@"
        };

        supertest(app)
            .post('/api/auth')
            .send(data)
            .expect(200)
            .end((err, res) => {
                if (err) console.log(err);
                assert.equal(res.status, 200);
                assert.property(res.body, 'data');
                token = res.body.data;

                done();
            });
    });

    it('should create a dummy event to check later', (done) => {
        const data = {
            title: "Test Event",
            description: "Only created for testing",
            lat: 29.37144,
            lng: 90.4333,
            location: "Test site",
            date: new Date('2023-11-25T00:00:00.000+00:00'),
            time: "12:12",
            Event_type: "Physical"
        }

        supertest(app)
            .post('/api/Event')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect(201)
            .end((err, res) => {
                if (err) console.log(err);
                assert.equal(res.status, 201);
                done();
            });
    });

    it('should fetch the created event', (done) => {
        supertest(app)
            .get('/api/MyEvent')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .end((err, res) => {

                if (err) console.log(err);
                assert.equal(res.status, 200);
                assert.isArray(res.body, 'Response should be an array');

                const event = res.body[0];

                assert.property(event, '_id');
                assert.property(event, 'title');
                assert.property(event, 'description');
                assert.property(event, 'lat');
                assert.property(event, 'lng');
                assert.property(event, 'location');
                assert.property(event, 'date');
                assert.property(event, 'time');
                assert.property(event, 'Event_type');
                assert.property(event, 'organizer');
                assert.property(event, 'participants');
                assert.property(event, 'interested');

                assert.equal(event.organizer, 'test@gmail.com');
                eventId = event._id;
                done();
            });
    });

    it('should fetch participants for the created event', (done) => {
        supertest(app)
            .get(`/api/MyEvent/${eventId}/participants`)
            .expect(200)
            .end((err, res) => {
                if (err) console.log(err);
                assert.equal(res.status, 200);
                assert.isArray(res.body, 'Response should be an array');
                done();
            });
    });

    it('should fetch interested users for the created event', (done) => {
        supertest(app)
            .get(`/api/MyEvent/${eventId}/interested`)
            .expect(200)
            .end((err, res) => {
                if (err) console.log(err);
                assert.equal(res.status, 200);
                assert.isArray(res.body, 'Response should be an array');
                done();
            });
    });

    it('should update the created event', (done) => {
        const updatedData = {
            title: 'Updated Test Event',
            description: 'Updated description for testing',
            location: 'Updated Test site',
            date: new Date('2023-11-26T00:00:00.000+00:00'),
            time: '13:13',
            Event_type: 'Virtual',
        };

        supertest(app)
            .post(`/api/MyEvent/${eventId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedData)
            .expect(200)
            .end((err, res) => {
                if (err) console.log(err);
                assert.equal(res.status, 200);
                assert.property(res.body, '_id');
                assert.equal(res.body.title, updatedData.title);
                assert.equal(res.body.description, updatedData.description);
                assert.equal(res.body.location, updatedData.location);
                assert.equal(res.body.date, updatedData.date.toISOString());
                assert.equal(res.body.time, updatedData.time);
                assert.equal(res.body.Event_type, updatedData.Event_type);

                assert.equal(res.body.organizer, 'test@gmail.com');
                done();
            });
    });

    it('should delete the created event', (done) => {
        supertest(app)
            .delete(`/api/MyEvent/${eventId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .end((err, res) => {
                if (err) console.log(err);
                assert.equal(res.status, 200);
                done();
            });
    });
})