const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = process.env.PORT || 3000;
const User = require('./routes/User');
const Business = require('./routes/Business');
const Product = require('./routes/Product');
app.use('/user', User);
app.use('/business', Business);
app.use('/product', Product);
app.listen(port, 'localhost', ()=>{
	console.log(`application is running on ${port}`);
});