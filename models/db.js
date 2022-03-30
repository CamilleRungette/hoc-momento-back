var mongoose = require('mongoose');
var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

require('dotenv').config()


mongoose.connect(process.env.MONGO_ACCESS, options, error =>{
	if (error) {
   console.log("ATTENTION ERREUR:", error);
  } else {
  	console.log("Serveur BDD connecté")
  }
});

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
// https://mongoosejs.com/docs/deprecations.html
// mongoose.set('useFindAndModify', false);


module.exports = mongoose;
