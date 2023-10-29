const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");

const {
  deleteEvent,
  getEventsCreatedByUser,
  EcoEventAddParticipant,
  EcoEventMarkInterestedUser,
  EcoEventCreate,
  getEcoEvent,
} = require("../../backend/controller/EcoEventController");

const EcoEvent = require("../../backend/models/EcoEvent");

describe("EcoEvent createEvent controller", () => {
  it("should create a new event and send a success response", async () => {
    const req = {
      user: {
        email: "test@example.com",
      },
      body: {
        title: "Test Event",
        description: "Description of the event",
        location: "Test Location",
        date: "2023-11-01",
        time: "13:00",
        Event_type: "Test Type",
      },
    };
    const res = {
      status: sinon.stub(),
      json: sinon.stub(),
    };
    res.status.returns(res);

    const saveStub = sinon.stub(EcoEvent.prototype, "save").resolves();

    await EcoEventCreate(req, res);

    expect(saveStub.calledOnce).to.be.true;
    expect(saveStub.firstCall.thisValue).to.be.an.instanceOf(EcoEvent);
    expect(saveStub.firstCall.thisValue.title).to.equal("Test Event");
    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledOnce).to.be.true;
    //console.log(res.json.firstCall.args);

    saveStub.restore();
  });
});

describe("EcoEvent getEvent controller", () => {
  it("should retrieve all the events", async () => {
    const sampleEvents = [
      {
        title: "Test Event",
        description: "Description of the event",
        location: "Test Location",
        date: "2023-11-01",
        time: "13:00",
        Event_type: "Test Type",
      },
    ];
    const findStub = sinon.stub(EcoEvent, "find").resolves(sampleEvents);

    const res = {
      json: sinon.stub(),
    };

    await getEcoEvent({}, res);

    expect(findStub.calledOnce).to.be.true;
    expect(res.json.calledOnce).to.be.true;
    expect(res.json.firstCall.args[0]).to.deep.equal(sampleEvents);

    findStub.restore();
  });
});
