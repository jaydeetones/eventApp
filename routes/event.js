import express from "express";
import { createEvent, getEvent, updateEvent, deleteEvent } from "../controllers/eventController.js"

const eventRouter = express.Router();

eventRouter.post('/', createEvent);
eventRouter.get('/', getEvent);
eventRouter.put('/:id', updateEvent);
eventRouter.delete('/:id', deleteEvent);

export default eventRouter;