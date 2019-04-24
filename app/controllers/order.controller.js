const Order = require("../models/order.model.js");
const Item = require("../models/item.model.js");

// Create and Save a new order
exports.create = (req, res) => {
  if (!req.body.customerName) {
    return res.status(400).send({
      message: "Order content can not be empty"
    });
  }
  //console.log(req.body.items);

  const order = new Order({
    customerName: req.body.customerName,
    createdDate: req.body.createdDate,
    items: req.body.items
  });
  //console.log(order);
  // Save Order in the database
  order.save().then(data => {
    //console.log(data);
    res.send(data);
    console.log("dhsghsdgj");
    console.log(order.items);

    for (var i = 0; i < order.items.length; i++) {
      changeItem = Item.findOneAndUpdate(
        { _id: order.items[i].Itemid },
        {
          $inc: { Qty: -order.items[i].Qty }
        },
        { new: true }
      )

        .then(result => {
          res.send(result);
          console.log("*******");
          console.log(result);
        })
        .catch(err => {
          console.log(console.error);
          res.send(err);
        });
    }
  });
};

//create items
exports.itemcreate = (req, res) => {
  console.log("heeee");
  // Validate request
  if (!req.body.Itemname) {
    return res.status(400).send({
      message: "Order content can not be empty"
    });
  }

  const item = new Item({
    Itemid: req.body.Itemid,
    Itemname: req.body.Itemname,
    Qty: req.body.Qty,
    unitprice: req.body.unitprice
  });
  console.log(item);
  // Save Order in the database
  item
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

//create new item and post it to existing order
exports.createItem = (req, res) => {
  console.log(req.body.ItemId);
  console.log(req.body.Qty);

  var item = new Item({
    Itemid: req.body.ItemId,
    Qty: req.body.Qty
  });

  const addItem = Order.findByIdAndUpdate(
    req.params.orderId,
    {
      $push: {
        items: item
      }
    },
    { new: true }
  )
    .populate("items.Itemid")
    .then(
      (changeItem = Item.findOneAndUpdate(
        { _id: req.body.ItemId },
        {
          $inc: { Qty: -1 }
        },
        { new: true }
      )
        .then(result => {
          res.send(result);
          console.log("*******");
          console.log(result);
        })
        .catch(err => {
          console.log(console.error);
          res.send(err);
        }))
    );
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

//get all items in database
exports.findAllItems = (req, res) => {
  Item.find()
    .then(items => {
      res.send(items);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes."
      });
    });
};

// Find a single order with order id
exports.findOneOrder = (req, res) => {
  //console.log(req.params.orderId);

  Order.findById(req.params.orderId)
    .then(order => {
      if (!order) {
        return res.status(404).send({
          message: "Order not found with id " + req.params.orderId
        });
      }
      console.log(order.items);
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
  if (!req.body.Qty) {
    return res.status(400).send({
      message: "Item quantity can not be empty"
    });
  }
  console.log(req.params);
  console.log(req.params.itemId);

  const updatedData = {
    Qty: req.body.Qty,
    ItemId: req.params.itemId
  };

  Order.findByIdAndUpdate(
    req.params.orderId,
    updatedData,

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

//Delete items from itemlist
exports.deleteitem = (req, res) => {
  Item.findByIdAndRemove(req.params.itemId)

    .then(item => {
      if (!item) {
        console.log(request.params.itemId);
        return res.status(404).send({
          message: "Item not found with id " + req.params.itemId
        });
      }
      res.send({ message: "Item deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Item not found with id " + req.params.itemId
        });
      }
      return res.status(500).send({
        message: "Could not delete note with id " + req.params.itemId
      });
    });
};

//Delete an item from order
exports.itemdelete = (req, res) => {
  console.log(req.params.orderId);
  console.log(req.params.ItemId);

  Order.findById(req.params.orderId).then(order => {
    if (!order) {
      return res.status(404).send({
        message: "Order not found with id " + req.params.orderId
      });
    }

    console.log("dhfgjgjfh");
    console.log(order.items);
    var rem = []; //remaining items after deleting
    var qty = "";
    for (var i = 0; i < order.items.length; i++) {
      if (order.items[i].Itemid != req.params.ItemId) {
        rem[i] = order.items[i];
      } else {
        qty = order.items[i].Qty;
        console.log(qty);
      }
    }
    console.log(rem);

    //remove empty elements from array
    var filtered = rem.filter(function(el) {
      return el;
    });
    console.log("filtered" + " " + filtered);

    const addOrder = Order.findByIdAndUpdate(req.params.orderId, {
      $set: {
        items: filtered
      }
    }).then(
      (changeItem = Item.findOneAndUpdate(
        { _id: req.params.ItemId },
        {
          $inc: { Qty: +qty }
        },
        { new: true }
      )
        .then(result => {
          res.send(result);
          console.log("*******");
          console.log(result);
        })
        .catch(err => {
          console.log(console.error);
          res.send(err);
        }))
    );
  });
};
