const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = mongoose.Schema({
  Itemid: {
    type: Schema.Types.ObjectId
  },
  Itemname: {
    type: String
  },
  Qty: {
    type: Number
  },
  unitprice: {
    type: Number
  }
});

module.exports = mongoose.model("Item", ItemSchema);
