const express = require('express');
const ObjectId = require('mongoose').Types.ObjectId;
const routes = express.Router();
const app = express();
const businessModel = require('../models/business');
const userModel = require('../models/user');
const { check, validationResult } = require('express-validator');

routes.post('/create', async(req, res, next)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {
    name,
    email,
    registrationNo,
    userId
  } = req.body;
  const user = new ObjectId(userId);
  try {
    const checkUser = await userModel.findOne({_id:user});
    if(checkUser) {
      const regNo = await businessModel.findOne({registrationNo});
      if(regNo) {
        return res.status(200).json({ message: "Registrationo Number already exists."});
      }
      const data = await businessModel.create({
        name, 
        email, 
        registrationNo,
        user
      });
      return res.status(200).json({ message: "Business successfully created" , results:data});
    }
    else {
      return res.status(200).json({ message: "User not found with this userId"});
    }
  } catch(e) {
    return res.status(401).json({ errors: "Internal error" });
  }
});
routes.get('/lists', async(req, res, next)=>{
  try {
    const data = await businessModel.find().populate('user').exec();
    if(data.length)
      return res.status(401).json({ message: "success" , results : data});
    else
      return res.status(401).json({ message: "success" , results : {}});
  } catch(e) {
    return res.status(401).json({ errors: "Internal error" });
  }
})
module.exports = routes;