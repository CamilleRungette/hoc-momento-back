const express = require('express');
const router = express.Router();

const ActionModel = require('../models/cultural_actions');
const ShowModel = require('../models/shows');
const MessageModel = require('../models/message')
const EventModel = require('../models/event');

/* GET home page. */
router.get('/', async function(req, res) {
  console.log("======> CONNECTION BACK-END SUCCESSFUL");
  res.render('index', { title: 'Express' });
});

router.post('/message', function(req, res){
  
  let newMessage = new MessageModel({
    date: new Date,
    name: req.body.name, 
    email: req.body.email, 
    content: req.body.message, 
    read: false
  });

  newMessage.save((err, msg) => {
    if (err) console.log('error', err);
    else if (msg){
      console.log("MESSAGE SAVED SUCCESSFULLY");
      res.send(msg)
    }
  });
});


router.get('/shows', async function(req, res){
  shows = await ShowModel.find({}, function(err, data){
    if (!err){
      console.log("======> GET SHOWS SUCCESS");
    } else {
      console.log("ERROOOOOR ====>", err);;
    }
  }).clone()
  .catch(function(err){console.log("GET SHOWS ERROR", err);});
  shows.reverse();
  res.send(shows);
});

router.get('/show', async function(req, res) {
  show = await ShowModel.findOne({_id: req.query.id})
  show ? res.send(show) : res.send({error: "No show found"})
});

router.get('/actions', async function(req, res){
  actions = await ActionModel.find({}, function(err, data){
    if (!err){
      console.log("======> GET ACTIONS SUCCESS");
    } else {
      throw err;
    }
  }).clone()
  .catch(function(err){console.log("GET ACTIONS ERROR:", err);});
  actions.reverse();
  res.send(actions)
});

router.get('/action', async function(req, res) {
  action = await ActionModel.findOne({_id: req.query.id})
  action ? res.send(action) : res.send({error: "No action found"})
});

router.get("/events", async function(res, res){
  events = await EventModel.find({}, function(err, data){
    if (!err){
      console.log("======> GET EVENTS SUCCESS");
    } else {
      console.log("ERROOOOOR ====>", err);;
    };
  }).clone()
  .catch(function(err){console.log("GET EVENTS ERROR:", err)});

  res.send(events);
});


module.exports = router;
