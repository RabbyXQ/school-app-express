const eventsModel = require('../model/eventsModel');

const addEvent = async (req, res) => {
    const { title, content, gallery_id } = req.body;
    try {
        const result = await eventsModel.addEvent(title, content, gallery_id);
        res.status(201).json({ message: 'Event created successfully', result });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create event' });
    }
};

const getEventByID = async (req, res) => {
    const { id } = req.params;
    try {
        const event = await eventsModel.getEventByID(id);
        if (event) {
            res.status(200).json(event);
        } else {
            res.status(404).json({ error: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to get event' });
    }
};

const updateEvent = async (req, res) => {
    const { id } = req.params;
    const { title, content, gallery_id } = req.body;
    try {
        const affectedRows = await eventsModel.updateEvent(id, title, content, gallery_id);
        if (affectedRows > 0) {
            res.status(200).json({ message: 'Event updated successfully' });
        } else {
            res.status(404).json({ error: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update event' });
    }
};

const deleteEvent = async (req, res) => {
    const { id } = req.params;
    try {
        const affectedRows = await eventsModel.deleteEvent(id);
        if (affectedRows > 0) {
            res.status(200).json({ message: 'Event deleted successfully' });
        } else {
            res.status(404).json({ error: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete event' });
    }
};

const getAllEvents = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const result = await eventsModel.getAllEvents(parseInt(page), parseInt(limit));
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get events' });
    }
};

module.exports = {
    addEvent,
    getEventByID,
    updateEvent,
    deleteEvent,
    getAllEvents
};
