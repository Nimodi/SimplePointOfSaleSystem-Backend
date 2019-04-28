const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    }
  ]
});

module.exports = mongoose.model("Order", OrderSchema);
