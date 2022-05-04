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

router.post('/edit-event', async (req, res) => {
  try{
    thisEvent = await EventModel.findOne({_id: req.body._id});
    if (thisEvent){
      update = await EventModel.updateOne(
        {_id: thisEvent._id},
        {
          title: req.body.title,
          description: req.body.description,
          dates: req.body.dates,
          photo: req.body.photo,
          title: req.body.title,
        }
      )
      updatedEvent = await EventModel.findOne({_id: req.body._id});
      res.send(updatedEvent);
    } else {
      res.send("no document");
    };

  } catch (error) {
    console.log(error);
    res.send(error)
  };
});

router.post('/delete-event', async (req, res) => {
  try{
    EventModel.deleteOne({_id: req.body.id}, function(err, event) {
      if (event) res.send("success");
      if(err) res.send({error: err})
    });
  } catch(error){
    console.log(error);
    res.send(error);
  };
});

module.exports = router;
