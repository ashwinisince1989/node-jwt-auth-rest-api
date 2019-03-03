const mongoose = require('mongoose');

let LeaderSchema = new mongoose.Schema({
  //  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true, unique: true }, 
  address: { type: String, required: false},
  description: { type: String, required: false },
  partyname: { type: String, required: false },
  dob: { type: String, required: false },
  marriage_status: { type: String, required: false },
  anniversary: { type: String, required: false },
  history: { type: String, required: false },
  image: { type: String, required: false },
  email:{ type: String, required: true, match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/},
  phone:{ type: String, required: false },
  createdOn: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Leader', LeaderSchema);