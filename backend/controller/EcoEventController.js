const EcoEvent = require('../models/EcoEvent');
const path = require('path');

const EcoEventCreate = async (req, res) => {

    try {
        const { email } = req.user;

        const { title, description, lat, lng, location, date, time, Event_type } = req.body;
        const EventImagePath = req.file ? req.file.path : undefined;

        const newEvent = new EcoEvent({
            title,
            description,
            eventImage: EventImagePath ? path.basename(EventImagePath) : undefined,
            lat,
            lng,
            location,
            date,
            time,
            Event_type,
            organizer: email
        });

        await newEvent.save();

        res.status(201).json({
            email,
            message: 'Event created successfully',
            event: newEvent, // Optionally, you can send back the created event.
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getEcoEvent = async (req, res) => {
    try {
        const { email } = req.user;
        const events = await EcoEvent.find({ organizer: { $ne: email } }).sort({ date: -1 });

        return res.json(events);
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving events', error: error });
    }
};



const EcoEventAddParticipant = async (req, res) => {
    try {
        const { email } = req.user;
        const eventId = req.params.eventId;

        const updatedEvent = await EcoEvent.findByIdAndUpdate(eventId, { $push: { participants: email } }, { new: true });

        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.json(updatedEvent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const EcoEventMarkInterestedUser = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const { email } = req.user;
        const updatedEvent = await EcoEvent.findByIdAndUpdate(eventId, { $push: { interested: email } }, { new: true });

        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.json(updatedEvent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getInterestedEvents = async (req, res) => {
    try {
        const { email } = req.user;

        const interestedEvents = await EcoEvent.find({ interested: email }).sort({ date: -1 });

        res.json(interestedEvents);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getParticipatingEvents = async (req, res) => {
    try {
        const { email } = req.user;

        const participatingEvents = await EcoEvent.find({ participants: email }).sort({ date: -1 });

        res.json(participatingEvents);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const checkInterestedUser = async (req, res) => {
    try {
        const { email } = req.user;
        const eventId=req.params.eventId;

        const Event = await EcoEvent.findById(eventId);
        res.json(Event.interested.includes(email));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const checkParticipatingUser = async (req, res) => {
    try {
        const { email } = req.user;
        const eventId=req.params.eventId;

        const Event = await EcoEvent.findById(eventId);
        res.json(Event.participants.includes(email));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



module.exports = {
    EcoEventAddParticipant,
    EcoEventMarkInterestedUser,
    EcoEventCreate,
    getEcoEvent,
    getInterestedEvents,
    getParticipatingEvents,
    checkInterestedUser,
    checkParticipatingUser
};


