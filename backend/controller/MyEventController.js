const EcoEvent = require('../models/EcoEvent');

const getEvents = async (req, res) => {
    try {
        const { email } = req.user;
        const events = await EcoEvent.find({ organizer: email }).sort({ date: -1 });
        return res.json(events);
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving events created by the user', error: error });
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


const getEventParticipants = async (req, res) => {
    try {
        const eventId = req.params.eventId;

        // Find the event by ID
        const event = await EcoEvent.findById(eventId);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const participants = event.participants || [];

        res.json(participants);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


module.exports = {
    getEvents,
    deleteEvent,
    getEventParticipants
};