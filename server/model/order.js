var {
  mongoose
} = require('./../db/mongoose');
var Order = mongoose.model('Order', {
  customerID: {
    type: Number,
    default: null

  },
  employeeID: {
    type: Number,
    default: null
  },
  orderDate: {
    type: Date,
    default: null
  },
  requiredDate: {
    type: Date,
    default: null
  },
  shippedDate: {
    type: Date,
    default: null
  },
  shipVia: {
    type: Number,
    default: null
  },
  freight: {
    type: Number,
    default: null
  },
  shipName: {
    type: String,
    maxlength: 40,
    default: null
  },
  shipAddress: {
    type: String,
    maxlength: 60,
    default: null
  },
  shipCity: {
    type: String,
    maxlength: 15,
    default: null
  },
  shipRegion: {
    type: String,
    maxlength: 15,
    default: null
  },
  shipPostalCode: {
    type: String,
    maxlength: 10,
    default: null
  },
  shipCountry: {
    type: String,
    maxlength: 15,
    default: null
  },
  
  orderDetails:
    {
      type:[
        {
        unitPrice: {
          type: Number,
         required: true

        },
        quantity: {
          type: Number,
          required: true

        },
        discount: {
          type: Number,
          required: true

        }
      }
    ],
      required:true
    }


});
module.exports={
  Order
}
