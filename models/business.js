const mongoose = require('mongoose');
const config = require('../configs/Database.js');
mongoose.connect(config.mongoURL,  {useNewUrlParser: true, useUnifiedTopology: true});

const Schema = new mongoose.Schema({
	name:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true
	},
	registrationNo:{
		type:String,
		required:true,
		unique:true
	},
	user:{
      	type: mongoose.Schema.Types.ObjectId, 
      	ref:'user',
      	required: true,
	}
});
const businessModel = mongoose.model('business', Schema);
module.exports = businessModel;