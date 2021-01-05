const express = require('express');
const routes = express.Router();
const app = express();
const userModel = require('../models/user');
const fs = require('fs');
const path = require('path'); 
const multer = require('multer');
const { check, validationResult } = require('express-validator');
// middleware for image uploading
var storage = multer.diskStorage({
  destination: 'uploads/', 
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
//init filenishu uploading
var upload = multer({
  storage: storage,
  limits:{fileSize:1024*30},
  fileFilter: (req, file, cb)=>{
    checkFileType(file, cb);
  }
});
const checkFileType = (file, cb) => {
  // Allowed Extension
  const fileTypes = /jpeg|jpg|png|gif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
  const mimeType = fileTypes.test(file.mimetype);
  if(mimeType && extname) {
    return cb(null, true);
  }
  else {
    return cb(new Error('Only images are allowed'));
  }
};
routes.post('/create', upload.single('profilePic'),
  [
    check('name', 'Name should not be empty').exists(), 
    check('email', 'Email should not be empty').exists(), 
    check('email').isEmail(), 
    check('bio', 'Bio should not be empty').exists(),
    check('profilePic').custom((value, { req }) => {
      if (!req.file) throw new Error("Profile pic is required (maxsize 30KB)");
      return true;
    }),
  ], async(req, res, next)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } 
  const {
    name,
    email,
    bio,
  } = req.body;

  try {
    const checkData = await userModel.findOne({email}).exec();
    console.log(checkData);
    if(checkData)
      return res.status(200).json({ errors: "Email already exists" });
  } catch(e) {
    return res.status(401).json({ errors: "Internal error" });
  }
  try {
    const data = await userModel.create({
      name, 
      email, 
      bio, 
      profilePic:{
        url: req.file.path, 
        contentType: 'image/png'
      }
    });
    return res.status(200).json({ message: "User successfully created" , results:data});
  } catch(e) {
    return res.status(401).json({ errors: "Internal error" });
  }
});
routes.get('/lists', async(req, res, next)=>{
  try {
    const data = await userModel.find().exec();
    if(data.length)
      return res.status(401).json({ message: "success" , results : data});
    else
      return res.status(401).json({ message: "success" , results : {}});
  } catch(e) {
    return res.status(401).json({ errors: "Internal error" });
  }
})
module.exports = routes;