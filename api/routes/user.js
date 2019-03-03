var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require('../models/User');
var validate = require('../models/User').validate;
const checkAuth = require('../middleware/check-auth');

const jwt = require("jsonwebtoken");
function getToken(user) {
  return jwt.sign({
    email: user.email,
    userId: user._id
  },
    process.env.JWT_KEY,
    {
      expiresIn: "24h"
    }
  );
}
router.post("/signup", (req, res, next) => {
  User.findOne({ email: req.body.email }, (err, ruser) => {
    if (err) {
      res.status(500).send(err);
    } else if (ruser) {
      res.status(409).json({
        message: "Email id already exists.",
        error_code: "200",
        status: false
      });
    } else {
      const user = new User({
        email: req.body.email,
        name: req.body.name,
        phone: req.body.phone
      });
      user.password = user.encryptPassword(req.body.password)
      user.save((err, result) => {
        err ? res.status(500).send({
          message: "Registration process fail.",
          error_code: "200",
          status: false
        })
          : res.status(200).send({
            message: "Registraion sucessfull.",
            error_code: "200",
            status: true,
            result: result
          })
      });
    }
  });
});

router.post("/login", (req, res, next) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      res.status(500).send(err);
    } else if (!user) {
      res.status(403).send({
        message: "Invalid username or password.",
        error_code: "200",
        status: false,
      });
    } else {
      let _validate = validate(req.body.password, user.password);
      !_validate ? res.status(403).send(
        {
          message: "Incorrect password",
          error_code: "200",
          status: false
        }) : res.status(200).send({
          message: "Auth successful",
          error_code: "200",
          status: true,
          token: getToken(user)
        });
    }
  });
});

router.put("/update_profile", checkAuth, (req, res, next) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      res.status(500).send(err);
    } else if (!user) {
      res.status(409).json({
        message: "User auth fail. Please try again.",
        error_code: "200",
        status: false
      });
    } else {
      var myquery = { email: user.email };
      var newvalues = { "$set": { name: req.body.name, phone: req.body.phone } };
      User.update(myquery, newvalues, (err, result) => {
        err ? res.status(500).send({
          message: err,
          error_code: "200",
          status: false
        })
          : res.status(200).send({
            message: "Profile updated sucessfull.",
            error_code: "200",
            status: true,
            result: result
          });
      });
    }
  });
});


router.delete("/delete", checkAuth, function (req, res) {
  User.deleteOne({ email: req.body.email }, (err) => {
    if (err) {
      res.status(500).send({
        message: err,
        error_code: "200",
        status: false
      })
    } else {
      res.status(200).send({
        message: "User deleted sucessfull.",
        error_code: "200",
        status: true
      })
    }
  });
});

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', checkAuth, function (req, res) {
  User.find({}, function (err, users) {
    if (err) return res.status(500).send("There was a problem finding the users.");
    res.status(200).send(users);
  });
});

// GETS A SINGLE USER FROM THE DATABASE
router.get('/:id', checkAuth, function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");
    res.status(200).send(user);
  });
});

module.exports = router;