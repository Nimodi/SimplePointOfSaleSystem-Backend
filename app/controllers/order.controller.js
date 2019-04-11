const Order = require("../models/order.model.js");
const Item = require("../models/item.model.js");
// Create and Save a new order
exports.create = (req, res) => {
  // Validate request
  if (!req.body.items) {
    return res.status(400).send({
      message: "Order content can not be empty"
    });
  }
  console.log(req.body.items);

  const order = new Order({
    orderId: req.body.orderId,
    customerName: req.body.customerName,
    createdDate: req.body.createdDate,

    items: req.body.items
  });
  console.log(order);
  // Save Order in the database
  order
    .save()
    .then(data => {
      console.log(data);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Note."
      });
    });
};

// Retrieve and return all orders from the database.
exports.findAll = (req, res) => {
  Order.find()
    .then(orders => {
      res.send(orders);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes."
      });
    });
};

// Find a single order with order id
exports.findOneOrder = (req, res) => {
  console.log(req.params.orderId);
  Order.findById(req.params.orderId)
    .then(order => {
      if (!order) {
        return res.status(404).send({
          message: "Order not found with id " + req.params.orderId
        });
      }
      console.log(order);
      res.send(order);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Note not found with id " + req.params.orderId
        });
      }
      return res.status(500).send({
        message: "Error retrieving note with id " + req.params.orderId
      });
    });
};

//get a particular item
exports.findOneItem = (req, res) => {
  Item.findById(req.params.itemId)
    .then(item => {
      if (!item) {
        return res.status(404).send({
          message: "Order not found with id " + req.params.itemId
        });
      }
      console.log(item);
      res.send();
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Note not found with id " + req.params.itemId
        });
      }
      return res.status(500).send({
        message: "Error retrieving note with id " + req.params.itemId
      });
    });
};

// Update the item count in particular order in order detailed view
exports.update = (req, res) => {
  // Validate Request

  // Order.findByIdAndUpdate(req.params.orderId,req.params.itemId, req.body, function (err, order) {

  //     if (err) {
  //         res.json(err);
  //     }
  //     else {
  //         res.json(req.body);
  //     }
  // });

  if (!req.body.Qty) {
    return res.status(400).send({
      message: "Item quantity can not be empty"
    });
  }
  //console.log(req.body.orderName);
  console.log(req.params);
  console.log(req.params.itemId);
  // console.log(Item);
  // Find item and update it with the request body
  const updatedData = {
    Qty: req.body.Qty,
    ItemId: req.params.itemId
  };

  Order.findByIdAndUpdate(
    req.params.orderId,
    updatedData,
    // items: {
    //     ItemId: req.params.itemId,
    //      Qty: req.body.Qty
    //  }

    { new: true }
  )
    .then(item => {
      console.log(item);
      if (!item) {
        return res.status(404).send({
          message: "Item not found with itemid " + req.params.itemId
        });
      }
      res.send(item);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "item not found with id " + req.params.itemId
        });
      }
      return res.status(500).send({
        message: "Error updating note with id " + req.params.itemId
      });
    });

  // const updatedData = {
  //     Qty: req.body.Qty,
  //     ItemId: req.params.itemId
  // }

  // Item.findOneAndUpdate({_id:req.params.orderId}, {$set:{OrderName:req.body.OrderName}}, {new: true},function(err, item) {
  //     console.log(item);
  //     return res.send(item)
  //     if (err)
  //       return res.send(err);

  //     // res.send(updatedData);
  //     //console.log(item);
  // });
};

// Delete an  order.

exports.delete = (req, res) => {
  console.log(req.params.orderId);
  Order.findByIdAndRemove(req.params.orderId)

    .then(item => {
      if (!item) {
        console.log(request.params.orderId);
        return res.status(404).send({
          message: "Item not found with id " + req.params.orderId
        });
      }
      res.send({ message: "Item deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Item not found with id " + req.params.orderId
        });
      }
      return res.status(500).send({
        message: "Could not delete note with id " + req.params.orderId
      });
    });
};

//Delete an item from order
exports.itemdelete = (req, res) => {
  // console.log(req.params.itemId);

  //Remone item from order

  // Order.findByIdAndRemove([req.params.orderId,req.params.ItemId])
  //   // orderId:req.params.orderId}

  // .then(item => {
  //     if(!item) {
  //         console.log(request.params.ItemId);
  //         return res.status(404).send({
  //             message: "Item not found with id " + req.params.itemId
  //         });
  //     }
  //     res.send({message: "Item deleted successfully!"});
  // }).catch(err => {
  //     if(err.kind === 'ObjectId' || err.name === 'NotFound') {
  //         return res.status(404).send({
  //             message: "Item not found with id " + req.params.itemId
  //         });
  //     }
  //     return res.status(500).send({
  //         message: "Could not delete note with id " + req.params.itemId
  //     });
  // });

  // Order.findByIdAndRemove({_id: [req.params.orderId,req.params.itemId]},function(err, item){

  //     if (err)
  //       res.send(err);
  //     //res.send("item deleted successfully");

  // });

  exports.findOneOrder = (req, res) => {
    console.log(req.params.orderId);
    Order.findById(req.params.orderId)
      .then(order => {
        if (!order) {
          return res.status(404).send({
            message: "Order not found with id " + req.params.orderId
          });
        }
        console.log(order);
        res.send(order);
      })
      .catch(err => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: "Note not found with id " + req.params.orderId
          });
        }
        return res.status(500).send({
          message: "Error retrieving note with id " + req.params.orderId
        });
      });
  };
};
