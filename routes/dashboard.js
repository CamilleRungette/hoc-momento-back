const express = require('express');
const router = express.Router();

const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

const EventModel = require('../models/event');
const AdminModel = require('../models/admin');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create-admin', function(req, res, next){
  var salt = uid2(32)
  newAdmin = new AdminModel({
    email: req.body.email,
    salt: salt,
    password: SHA256(req.body.password + salt).toString(encBase64),
    token: uid2(32)
  });
  
  // newAdmin.save(function(error, admin){
  //   if (error){
  //       console.log("ADMIN NOT SAVED:", error)
  //       res.json({error})
  //   } else if (admin){
  //       console.log("ADMIN SAVED", admin)
  //       res.json({admin})
  //   }
  // });
})

router.post('/login', async function(req, res, next){
  
  searchAdmin = await AdminModel.findOne({email: req.body.email})
  console.log(searchAdmin);
  if (!searchAdmin){
    res.send("email");
  } else {
    hash = SHA256(req.body.password + searchAdmin.salt).toString(encBase64);  
    if (hash === searchAdmin.password){
      console.log(" =====> CONNECTION SUCCESSFULL");
      res.send("success")
    } else {
      console.log("=====> CONNECTION FAILED, WRONG PASSWORD");
      res.send("password");
    };
  };
});

router.post('/create-event', async (req, res) => {
  newEvent = new EventModel(req.body);

  try {
    newEvent.save((err, event) => {
      if (err) {
        console.log('Error:', err);
        res.send(err);
      } else if (event){
        console.log("Event successfully saved");
        res.send(event);
      };
    })
  } catch(error) {
    console.log("Error while creating new event:", error);
    res.send(error)
  };
});

module.exports = router;
