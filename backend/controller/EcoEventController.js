const EcoEvent = require('../models/EcoEvent');

const EcoEventCreate = async (req, res) => {
    //console.log("yes");
    try {
        const { email } = req.user;

        const { title, description, lat, lng, date, time, Event_type } = req.body;

        const newEvent = new EcoEvent({
            title,
            description,
            lat,
            lng,
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
        const events = await EcoEvent.find().sort({ date: -1 });
        return res.json(events);
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving events', error: error });
    }
};

const getEventsCreatedByUser = async (req, res) => {
    try {
        const { email } = req.user;
        const events = await EcoEvent.find({ organizer: email }).sort({ date: -1 });
        return res.json(events);
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving events created by the user', error: error });
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

const deleteEvent = async (req, res) => {
    try {
        const { email } = req.user;
        const eventId = req.params.eventId;

        // Find the event by ID and check if the organizer is the authenticated user
        const event = await EcoEvent.findOne({ _id: eventId, organizer: email });

        if (!event) {
            return res.status(404).json({ message: 'Event not found or unauthorized to delete' });
        }

        // Perform the event deletion
        await EcoEvent.deleteOne({ _id: eventId });

        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};




module.exports = {
    deleteEvent,
    getEventsCreatedByUser,
    EcoEventAddParticipant,
    EcoEventMarkInterestedUser,
    EcoEventCreate,
    getEcoEvent,
};


