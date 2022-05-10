const express = require('express');
const router = express.Router();

const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

const EventModel = require('../models/event');
const AdminModel = require('../models/admin');
const ShowModel = require('../models/shows');
const ActionModel = require('../models/cultural_actions');

// ============================ COMMON ============================ //
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


// ============================ CREATE ============================ //

router.post('/create-event', async (req, res) => {
  newEvent = new EventModel(req.body);

  try {
    newEvent.save((err, event) => {
      if (err) {
        console.log('Error:', err);
        res.send(err);
      } else if (event){
        console.log("EVENT SAVED SUCCESSFULLY");
        res.send(event);
      };
    });
  } catch(error) {
    console.log("ERROR WHILE CREATING NEW EVENT:", error);
    res.send(error)
  };
});

router.post('/create-show', async (req, res) => {
  
  newShow = new ShowModel(req.body);

  try{
    newShow.save((err, show) => {
      if (err) {
        console.log('Error:', err);
      } else if (show){
        console.log('SHOW CREATED SUCCESSFULLY');
        res.send(show);
      };
    });
  } catch (error) {
    console.log("ERROR WHILE CREATING THE SHOW:", error);
    res.send(error)
  };
});


// ============================ EDIT ============================ //

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

router.post('/edit-show', async (req, res) => {
  try {
    thisShow = await ShowModel.findOne({_id: req.body._id});

    if (thisShow) {
      update = await ShowModel.updateOne(
        {_id: thisShow._id},
        {
          title: req.body.title, 
          description: req.body.description,
          dates: req.body.dates,
          links: req.body.links
        }
      );

      updatedShow = await ShowModel.findOne({_id: req.body._id});
      res.send(updatedShow);   
    } else {
      res.send('no show')
    };

  } catch (error) {
    console.log(error);
    res.send(error);
  };
});

router.post('/edit-gallery', async (req, res) => {
  try{
    if (req.body.type === "show") {
      thisShow = await ShowModel.findOne({_id: req.body._id});

      if (thisShow){
        update = await ShowModel.updateOne(
          {_id: thisShow._id},
          {gallery: req.body.gallery}
        );

        updatedShow = await ShowModel.findOne({_id: req.body._id});
        res.send(updatedShow); 
      } else { res.send("no show")};
    } else if (req.body.type === "action") {
      item = await ActionModel.findOne({_id: req.body._id})
    
    };
  } catch(error) {
    console.log(error);
    res.send(error)
  };
});


// ============================ DELETE ============================ //

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

router.post('/delete-show', async (req, res) => {
  try{
    ShowModel.deleteOne({_id: req.body.id}, function(err, event) {
      if (event) res.send("success");
      if(err) res.send({error: err})
    });
  } catch(error){
    console.log(error);
    res.send(error);
  };
});

module.exports = router;
