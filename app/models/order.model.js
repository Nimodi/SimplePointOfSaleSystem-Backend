//const Item = require('../models/item.model.js');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//module.exports = mongoose.model('Item', Item.ItemSchema);

const OrderSchema = mongoose.Schema({
  orderId: {
    type: Schema.Types.ObjectId
  },
  customerName: {
    type: String
  },
  createdDate: {
    type: String
  },
  items: [
    {
      Itemid: {
        type: Schema.Types.ObjectId,
        ref: "Item"
      },
      Qty: {
        type: Number
      }
      // ref: "Item"
    }
  ]
});

module.exports = mongoose.model("Order", OrderSchema);
