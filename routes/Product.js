const express = require('express');
const routes = express.Router();
const app = express();
const userModel = require('../models/user');
const businessModel = require('../models/business');
const productModel = require('../models/product');
const ObjectId = require('mongoose').Types.ObjectId;
const fs = require('fs');
const path = require('path'); 
const multer = require('multer');
const { check, validationResult } = require('express-validator');
// middleware for image uploading
var storage = multer.diskStorage({
  destination: 'productImg/', 
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
//init filenishu uploading
var upload = multer({
  storage: storage,
  limits:{fileSize:30*1024},
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
routes.post('/create', upload.single('image'),
  [
    check('name', 'Name should not be empty').exists(), 
    check('mrp', 'mrp should not be empty').exists(), 
    check('description', 'Description must be at least 10 chars long').exists().isLength({min:5}),
    check('image').custom((value, { req }) => {
      if (!req.file) throw new Error("Product image is required (maxsize 30KB)");
      return true;
    }),
  ], async(req, res, next)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {
    name,
    mrp,
    description,
    userId,
    businessId
  } = req.body;
  let user = business = ''; 
  if(userId !== undefined && userId.length == 24) {
    user = new ObjectId(userId);
  }
  if(user == '') {
    if(businessId !== undefined && businessId.length == 24) {
      business = new ObjectId(businessId);
    }
  }
  if(business == '' && user == '') 
    return res.status(400).json({ errors: "Please enter userId or businessId" });
  else {
    if(business != '') {
      try {
        const checkData = await businessModel.findOne({_id:business}).exec();
        if(checkData) {
          const checkProduct = await productModel.findOne({_id:business, name:name}).exec();
          if(checkProduct)
            return res.status(200).json({ message: "product already exists with this user" });
          else { 
            const data = await productModel.create({
              name,
              mrp,
              description,
              image : {
                url : req.file.path,
                contentType : 'image/png'
              },
              business : business
            });
            return res.status(200).json({ message: "Product successfully created" , results:data});
          }
        } else {
          return res.status(200).json({ message: "businessId not found" });
        }
      } catch(e) {
        return res.status(401).json({ errors: "Internal error" });
      }
    } else {
      try {
        const checkData = await userModel.findOne({_id:user}).exec();
        if(checkData) {
          const checkProduct = await productModel.findOne({_id:user, name:name}).exec();
          if(checkProduct)
            return res.status(200).json({ message: "product already exists with this user" });
          else { 
            const data = await productModel.create({
              name,
              mrp,
              description,
              image : {
                url : req.file.path,
                contentType : 'image/png'
              },
              user : user
            });
            return res.status(200).json({ message: "Product successfully created" , results:data});
          }
        } else {
          return res.status(200).json({ message: "userId not found" });
        }
      } catch(e) {
        return res.status(401).json({ errors: "Internal error" });
      }
    }
  }
});
routes.get('/lists', async(req, res, next)=>{
  try {
    const data = await productModel.find().populate('user business').exec();
    if(data.length)
      return res.status(401).json({ message: "success" , results : data});
    else
      return res.status(401).json({ message: "success" , results : {}});
  } catch(e) {
    return res.status(401).json({ errors: "Internal error" });
  }
});
routes.post('/update', upload.single('productImage'),[
    check('productId', `productId cann't be empty`).exists(),
    check('productId', `productId should have 24 character`).isLength({min:24}),
    check('name', `name cann't be empty`).exists(),
    check('mrp', `mrp cann't be empty`).exists(),
    check('description', `description cann't be empty`).exists(),
  ], 
  async(req, res, next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      name,
      mrp,
      description,
    } = req.body;
  try {
    const objectId = new ObjectId(req.body.productId);
    const data = await productModel.updateOne({_id:objectId}, {
      name,
      mrp,
      description,
      image :  {
        url : req.file.path,
        contentType : 'image/png'
      }
    }).exec();
    if(data.nModified>0)
      return res.status(200).json({ message: ` ${data.nModified} rows successfully updated`});
    else  
      return res.status(200).json({ message: `record not found`});
  } catch(e) {
    return res.status(401).json({ errors: "Internal error" });
  }
});
routes.get('/delete', async(req, res, next)=>{
  const id = new ObjectId(req.query.id);
  try {
    const data = await productModel.deleteOne({_id:id}).populate('user business').exec();
    if(data.deletedCount>0)
      return res.status(200).json({ message: `${data.deletedCount} rows successfully deleted`});
    else
      return res.status(200).json({ message: `record not found`});
  } catch(e) {
    return res.status(401).json({ errors: "Internal error" });
  }
});

module.exports = routes;