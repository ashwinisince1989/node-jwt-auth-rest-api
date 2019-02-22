const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
let UserSchema = new mongoose.Schema({
  //  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
});

UserSchema.methods.encryptPassword = (password) => {
  console.log("bycript:::::::"+password);
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

UserSchema.methods.validPassword = function (password, hash) {
  console.log(password, hash)
  return bcrypt.compareSync(password, hash);
};
module.exports = mongoose.model('User', UserSchema);
module.exports.validate = UserSchema.methods.validPassword