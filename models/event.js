const mongoose = require('./db');

let eventSchema = mongoose.Schema({
    photo: String, 
    title: String, 
    dates: Array,
    description: String,
    type: String,
});

const eventModel = mongoose.model("events", eventSchema);

module.exports = eventModel;