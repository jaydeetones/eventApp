import Events from "../models/events.js";
import mongoose from "mongoose";

export const createEvent = async (req, res) => {
    const params = req.body;

    const isValid = await validateParams(params);

    if (isValid != true) {
        return res.status(400).json({ message: isValid.error })
    }

    try {
        let newEvent = new Events(params);

        await newEvent.save();
        res.status(201).json(newEvent);

    } catch(error) {
        res.status(400).json({ message: error.message });
    }
    
}

export const getEvent = async (req, res) => {
    
    try {
        const events = await Events.find({ status: 1})
            .populate({path: 'userId', select: ['firstName', 'middleName', 'lastName']});
        
        res.status(200).json(events);

    } catch(error) {
        res.status(400).json({ message: error.message });
    }
}

export const updateEvent = async (req, res) => {
    const _id = req.params.id;
    const params = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.statu(404).json({ message: `No event with this id ${_id}` });

    const isValid = await validateParams(params, _id);

    if (isValid != true) {
        return res.status(400).json({ message: isValid.error })
    }

    try {
        const updatedEvent = await Events.findByIdAndUpdate(_id, {...params, _id}, { new: true});

        res.json(updatedEvent);

    } catch(error) {
        res.status(400).json({ message: error.message });
    }
    
}

export const deleteEvent = async (req, res) => {
    const _id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({ message: `No event with this id ${_id}` });

    try {
        const updatedEventStatus = await Events.findByIdAndUpdate(_id, { status: 0 }, { new: true});

        res.json(updatedEventStatus);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
    
}

const validateParams = async (params, eventId='') => {
    if (!params.title) return { "error": "Missing title key" };
    if (!params.description) return { "error": "Missing description key" };
    if (!params.startTime) return { "error": "Missing startTime key" };
    if (!params.endTime) return { "error": "Missing endTime key" };

    if (!params.userId) return { "error": "Event should have at least 1 user" };
    if (Array.isArray(params.userId) && params.userId.length > 10) return { "error": "Event can only have maximum of 10 users" };
    
    const isValid = await validateEventTime(params.startTime, params.endTime, eventId);

    if (isValid != true) {
        return isValid;
    }

    return true;
}

const validateEventTime = async (startDateTime, endDateTime, eventId='') => {
    startDateTime = new Date(startDateTime);
    endDateTime = new Date(endDateTime);

    const dateNow = new Date();
    dateNow.setHours(dateNow.getHours() + 8);

    const newStartDateTime = new Date(startDateTime);
    newStartDateTime.setHours(newStartDateTime.getHours() - 8);
    const newEndDateTime = new Date(endDateTime);
    newEndDateTime.setHours(newEndDateTime.getHours() - 8);

    const startTime = `${newStartDateTime.getHours()}:${newStartDateTime.getMinutes()}:${newStartDateTime.getSeconds()}`;
    const endTime = `${newEndDateTime.getHours()}:${newEndDateTime.getMinutes()}:${newEndDateTime.getSeconds()}`;

    if (startDateTime < dateNow) return { "error": "Event start time already past the current time" };
    if (startDateTime > endDateTime) return { "error": "Invalid start time and end time" };
    if (startTime < "08:00:00" || startTime > "20:00:00") return { "error": `Event time should only between 8AM-8PM .. startTime: ${startTime}` };
    if (endTime < "08:00:00" || endTime > "20:00:00") return { "error": `Event time should only between 8AM-8PM.. endTime: ${endTime}` };
    
    const filter =  eventId != '' ? {'_id' : {$ne: eventId}} : {};

    const eventList = await Events.find( filter );
    for (const event of eventList) {
        if (event.startTime >= startDateTime && event.startTime < endDateTime) {
            return { "error": `Start and End Time overlaps the Start Time of event ID ${event._id}` }
        }
        if (event.endTime > startDateTime && event.endTime <= endDateTime) {
            return { "error": `Start and End Time overlaps the End Time for event ID ${event._id}` }
        }
    }
    
    return true
}