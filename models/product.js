const mongoose = require('mongoose');
const config = require('../configs/Database.js');
mongoose.connect(config.mongoURL,  {useNewUrlParser: true, useUnifiedTopology: true});
const Schema = new mongoose.Schema({
	name:{
		type:String,
		required:true
	},
	mrp:{
		type:String,
	},
	description:{
		type:String,
	},
	image : {
		url: String,
		contentType:String
	},
	user:{
      	type: mongoose.Schema.Types.ObjectId, 
      	ref:'user'
	},
	business:{
      	type: mongoose.Schema.Types.ObjectId, 
      	ref:'business'
	}
});
const productModel = mongoose.model('product', Schema);
module.exports = productModel;