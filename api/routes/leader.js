var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Leader = require('../models/Leader');
const checkAuth = require('../middleware/check-auth');

router.post("/create", checkAuth, (req, res, next) => {
  Leader.findOne({ name: req.body.name }, (err, rleader) => {
    if (err) {
      res.status(500).send(err);
    } else if (rleader) {
      res.status(409).json({
        message: "Name id already exists.",
        error_code: "200",
        status: false
      });
    } else {
      const leader = new Leader({
        email: req.body.email,
        name: req.body.name,
        address: req.body.address,
        description: req.body.description,
        partyname: req.body.partyname,
        dob: req.body.dob,
        marriage_status: req.body.marriage_status,
        anniversary: req.body.history,
        history: req.body.history,
        image:req.body.image,
        email: req.body.email,
        phone: req.body.phone,
        createdOn: req.body.createdOn
      });
      leader.save((err, result) => {
        err ? res.status(500).send({
          message: "Registration process fail.",
          error_code: "200",
          status: false
        })
          : res.status(200).send({
            message: "Leader created sucessfull.",
            error_code: "200",
            status: true,
            result: result
          })
      });
    }
  });
});

module.exports = router;