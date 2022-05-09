const mongoose = require('./db');

let showSchema = mongoose.Schema({
  title: String, 
  dates: [Object],
  description: String,
  links: Array,
  gallery: [String],
});

const ShowModel = mongoose.model("shows", showSchema);

module.exports = ShowModel;