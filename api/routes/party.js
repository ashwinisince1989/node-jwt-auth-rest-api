var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var party = require('../models/Party');
const checkAuth = require('../middleware/check-auth');

router.post("/create", checkAuth, (req, res, next) => {
  party.findOne({ name: req.body.name }, (err, rparty) => {
    if (err) {
      res.status(500).send(err);
    } else if (rparty) {
      res.status(409).json({
        message: "Name id already exists.",
        error_code: "200",
        status: false
      });
    } else {
      const party = new Party({
        party_name: req.body.party_name,
        party_head_name: req.body.party_head_name, 
        party_founded_by: req.body.party_founded_by, 
        party_founded_year: req.body.party_founded_year, 
        party_type: req.body.party_type, 
        party_logo: req.body.party_logo, 
        active_members: req.body.active_members, 
        headquarter_address: req.body.headquarter_address,
        headquarter_phone: req.body.headquarter_phone,
        headquarter_email: req.body.headquarter_email,
        headquarter_fax: req.body.headquarter_fax,
        history: req.body.history,
        party_website_link: req.body.party_website_link,
        party_wiki_link: req.body.party_wiki_link,
        party_facebook_link: req.body.party_facebook_link,
        party_twitter_link: req.body.party_twitter_link,
        about_party: req.body.about_party,
        party_manifesto: req.body.party_manifesto,
        party_tag_line: req.body.party_tag_line,
        party_other_adress:req.body.party_other_adress
      });
      party.save((err, result) => {
        err ? res.status(500).send({
          message: "Registration process fail.",
          error_code: "200",
          status: false
        })
          : res.status(200).send({
            message: "Party created sucessfull.",
            error_code: "200",
            status: true,
            result: result
          })
      });
    }
  });
});

module.exports = router;