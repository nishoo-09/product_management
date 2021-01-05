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
		index:{unique:true},
		required:true
	},
	bio:{
		type:String,
		required:true
	},
	profilePic:{
      	url: String, 
      	contentType: String,
	}
});
const userModel = mongoose.model('user', Schema);
module.exports = userModel;