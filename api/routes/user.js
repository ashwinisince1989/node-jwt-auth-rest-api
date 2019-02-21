var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require('../models/User');
var validate = require('../models/User').validate;
const  checkAuth =  require('../middleware/check-auth');

const jwt = require("jsonwebtoken");
function getToken(user){
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
    User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: "Mail exists"
          });
        } else {
          const user = new User({
            email: req.body.email,
            name: req.body.name,
            phone:req.body.phone
          });
          user.password=user.encryptPassword( req.body.password)
          user.save((err,result)=>{
            err?res.status(500).send(err):res.status(200).send(result)
          })
        
        }
      });
  });

  router.post("/login", (req, res, next) => {
    User.findOne({ email: req.body.email },(err,user)=>{
      if(err){
          res.status(500).send(err);
      }else if(!user){
          res.status(403).send({msg:"Pass"});
      }  else{
        let _validate=validate(req.body.password,user.password);
        
        !_validate?res.status(403).send({msg:"incorrect password"}):res.status(200).send({message: "Auth successful",token: getToken(user)});
      }
    });
  });
  
  router.delete("/:userId", (req, res, next) => {
    User.remove({ _id: req.params.userId })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "User deleted"
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

// GETS A SINGLE USER FROM THE DATABASE
router.get('/:id', function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
});

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/',checkAuth, function (req, res) {
    User.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
});

// GETS A SINGLE USER FROM THE DATABASE
router.get('/:id',checkAuth, function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
});

module.exports = router;