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
  items: { type: [], ref: "Item" }
});

module.exports = mongoose.model("Order", OrderSchema);

// items:[{

//     Itemname: {
//         type: String,

//     },
//     Qty: {
//         type: Number,

//     },
//     unitprice:{
//         type:Number
//     }

// }]

// updateMenuById: function (orderId,itemId, menu, callback) {
//     return db.query("update Order set itemId=?,itemName=?,unitPrice=?,Qty=? where orderId=? and itemId=?", [Item.itemId,Item.itemName,Item.unitPrice,Item.Qty, orderId,itemId], callback);
// }
