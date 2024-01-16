const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EcoEventScehma = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    eventImage: { type: String },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    Event_type: { type: String, required: true },
    organizer: { type: String, required: true },
    participants: { type: Array },
    interested: { type: Array }
});

module.exports = mongoose.model('EcoEvent', EcoEventScehma);