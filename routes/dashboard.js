const express = require('express');
const router = express.Router();

const EventModel = require('../models/event');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
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
