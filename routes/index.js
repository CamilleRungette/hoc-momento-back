var express = require('express');
var router = express.Router();

var ActionModel = require('../models/cultural_actions');
var ShowModel = require('../models/shows');


/* GET home page. */
router.get('/', async function(req, res, next) {
  console.log("======> CONNECTION BACK-END SUCCESSFUL");
  res.render('index', { title: 'Express' });
});

router.get('/shows', async function(req, res, next){
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
})

router.get('/actions', async function(req, res, next){
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
})


module.exports = router;
