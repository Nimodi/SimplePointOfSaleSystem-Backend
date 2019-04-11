const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = mongoose.Schema({
    ItemId: {
        type: String,
    },
   
    Itemname: {
		type: String,
		
    },
    Qty: {
        type: Number,
        
    },
    unitprice:{
        type:Number
    }

});

module.exports = mongoose.model('Item', ItemSchema);

