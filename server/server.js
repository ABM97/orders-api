const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
var {
  ObjectID
} = require('mongodb');
var {
  mongoose
} = require('./db/mongoose');
var {
  Order
} = require('./model/order');

// var order = new Order({
//   orderDetails:[
//     {
//       unitPrice:10,
//       quantity:20,
//       discount:30
//     }
//   ]
// });
//
// order.save().then((doc) => {
//   console.log(JSON.stringify(doc,undefined,2));
// });

var app = express();

app.use(bodyParser.json());

app.post('/order', (req, res) => {

  var order = new Order(req.body);
  order.save().then((doc) => {
    res.send(doc);
  }).catch((e) => {
    res.status(400).send();
  });
});

app.get('/order',(req,res) => {
  Order.find().then((orders) => {
    res.send({orders});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.get('/order/:id',(req,res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  Order.findById(id).then((order) => {
    if(!order)
    {
      return res.status(404).send();
    }
    res.send({order});
  });
});

app.put('/order/:id',(req,res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  var body = _.pick(req.body,['freight','shipVia','shipCity','shipRegion','shipAddress','shipPostalCode','shipPostalCode','shipCountry']);
  console.log(JSON.stringify(req.body,undefined,2));
  Order.findByIdAndUpdate(id,{$set:body},{new:true}).then((order) => {
    if(!order)
    {
      return res.status(404).send();
    }
    res.send({order});
  });
});

app.listen(3000, () => {
  console.log('Listening on 3000');
})
