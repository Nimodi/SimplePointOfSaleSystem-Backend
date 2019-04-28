module.exports = app => {
  const orders = require("../controllers/order.controller.js");

  // Create a new order
  app.post("/orders", orders.create);

  //Create items
  app.post("/items", orders.itemcreate);

  //create a new item for existing order
  app.post("/orders/:orderId", orders.createItem);

  // Retrieve all orders

  app.get("/orders", orders.findAll);

  //get all items
  app.get("/items", orders.findAllItems);

  // Retrieve a single order with orderId
  app.get("/orders/:orderId", orders.findOneOrder);
  app.get("/orders/items/:itemId", orders.findOneItem);

  // Update a Note with noteId
  app.put("/orders/:orderId/:itemId", orders.update);

  // Delete a Note with noteId
  app.delete("/orders/:orderId", orders.delete);

  //delete item from item list
  app.delete("/items/:itemId", orders.deleteitem);

  //Delete an item from order
  app.delete("/orders/:orderId/:ItemId", orders.itemdelete);
};
