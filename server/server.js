const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID}= require('mongodb');
var {mongoose} = require('./db/mongoose');
var {Order} = require('./model/order');
const port = Process.env.PORT || 3000;
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

app.get('/order', (req, res) => {
  Order.find().then((orders) => {
    res.send({orders});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.get('/order/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Order.findById(id).then((order) => {
    if (!order) {
      return res.status(404).send();
    }
    res.send({order});
  });
});

//PUT replaces a doc with a new one , PATCH updates an existing field in an existing doc

app.put('/order/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  var body = _.pick(req.body, [
    'freight',
    'shipVia',
    'shipCity',
    'shipRegion',
    'shipAddress',
    'shipPostalCode',
    'shipPostalCode',
    'shipCountry'
  ]);
  Order.findByIdAndUpdate(id, {
    $set: body
  }, {new: true}).then((order) => {
    if (!order) {
      return res.status(404).send();
    }
    res.send({order});
  });
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});
