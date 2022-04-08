const express = require('express');
const router = express.Router();

const ActionModel = require('../models/cultural_actions');
const ShowModel = require('../models/shows');
const MessageModel = require('../models/message')


/* GET home page. */
router.get('/', async function(req, res) {
  console.log("======> CONNECTION BACK-END SUCCESSFUL");
  res.render('index', { title: 'Express' });
});

router.get('/shows', async function(req, res){
  shows = await ShowModel.find({}, function(err, data){
    if (!err){
      console.log("======> GET shows success");
    } else {
      console.log("ERROOOOOR ====>", err);;
    }
  }).clone()
  .catch(function(err){console.log("GET shows error:", err);});
  shows.reverse();
  res.send(shows)
});

router.get('/show', async function(req, res) {
  show = await ShowModel.findOne({_id: req.query.id})
  show ? res.send(show) : res.send({error: "No show found"})
});

router.get('/actions', async function(req, res){
  actions = await ActionModel.find({}, function(err, data){
    if (!err){
      console.log("GET actions success");
    } else {
      throw err;
    }
  }).clone()
  .catch(function(err){console.log("GET actions error:", err);});
  actions.reverse();
  res.send(actions)
});

router.get('/action', async function(req, res) {
  action = await ActionModel.findOne({_id: req.query.id})
  action ? res.send(action) : res.send({error: "No action found"})
});


router.post('/message', function(req, res){
  console.log("MESSAGE ====>");
  
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
      console.log("Message successfully saved");
      res.send(msg)
    }
  })
})


module.exports = router;
