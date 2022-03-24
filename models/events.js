import mongoose from "mongoose";
const Schema = mongoose.Schema;

const eventsSchema = mongoose.Schema({
    title: String,
    description: String,
    startTime: Date,
    endTime: Date,  
    userId: [
        {type: Schema.Types.ObjectID, ref: 'Users'}
    ],
    status: {
        type: Number,
        default: 1
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Events = mongoose.model('Events', eventsSchema);

export default Events;