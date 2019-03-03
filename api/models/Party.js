const mongoose = require('mongoose');
let PartySchema = new mongoose.Schema({
  //  _id: mongoose.Schema.Types.ObjectId,
  party_name: { type: String, required: true, unique: true },
  party_head_name: { type: String, required: true }, 
  party_founded_by: { type: String, required: false }, 
  party_founded_year: { type: Date, required: false }, 
  party_type: { type: String, required: false }, 
  party_logo: { type: String, required: false }, 
  active_members: { type: Number, required: false }, 
  headquarter_address: { type: String, required: false},
  headquarter_phone: { type: String, required: false},
  headquarter_email: { type: String, required: false},
  headquarter_fax: { type: String, required: false},
  history: { type: String, required: false },
  party_website_link: { type: String, required: false },
  party_wiki_link: { type: String, required: false },
  party_facebook_link: { type: String, required: false },
  party_twitter_link: { type: String, required: false },
  about_party: { type: String, required: false },
  party_manifesto: { type: String, required: false },
  party_tag_line: { type: String, required: false },
  party_other_adress:{type: Array, required: false},
  createdOn: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Party', PartySchema);