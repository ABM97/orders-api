var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
 var {mongoose} = require('./db/mongoose');
 var {Order} = require('./model/order');


var order = new Order();
order.save().then((doc) => {
  console.log(doc);
});
var app = express();
app.listen(3000,() => {
  console.log('Listening on 3000');
})
