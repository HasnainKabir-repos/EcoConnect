const EcoEvent = require('../models/EcoEvent');
const path = require('path');

const getEvents = async (req, res) => {
    try {
        const { email } = req.user;
        const events = await EcoEvent.find({ organizer: email }).sort({ date: -1 });
        return res.status(200).json(events);
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

        res.status(200).json({ message: 'Event deleted successfully' });
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

const getInterestedUsers = async (req, res) => {
    try {
        const eventId = req.params.eventId;

        // Find the event by ID
        const event = await EcoEvent.findById(eventId);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const interestedUsers = event.interested || [];

        res.json(interestedUsers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const updateEvent = async (req, res) => {
    try {
        const eventId = req.params.eventId;

        // Check if the event exists
        const existingEvent = await EcoEvent.findById(eventId);
        const eventImagePath = req.file ? req.file.path : undefined;

        if (!existingEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check if the authenticated user is the organizer of the event
        const { email } = req.user;
        if (existingEvent.organizer !== email) {
            return res.status(403).json({ message: 'Unauthorized to update this event' });
        }

        // Extract and validate updated event details from the request body
        const { title, description, location, date, time, Event_type } = req.body;

        // Create an object with the fields to be updated
        const eventUpdate = {
            title,
            description,
            eventImage: eventImagePath ? path.basename(eventImagePath) : existingEvent.eventImage,
            location,
            date,
            time,
            Event_type,
        };

        // Update the event
        const updatedEvent = await EcoEvent.findByIdAndUpdate(eventId, eventUpdate, { new: true });
        
        if (updatedEvent) {
            res.status(200).json(updatedEvent);
        } else {
            res.status(500).json({ message: 'Failed to update event' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};




module.exports = {
    getEvents,
    deleteEvent,
    getEventParticipants,
    getInterestedUsers,
    updateEvent,
};