module.exports = app => {
  const orders = require("../controllers/order.controller.js");

  // Create a new Note
  app.post("/orders", orders.create);

  // Retrieve all Notes
  app.get("/orders", orders.findAll);

  // Retrieve a single Note with noteId
  app.get("/orders/:orderId", orders.findOneOrder);
  app.get("/orders/items/:itemId", orders.findOneItem);

  // Update a Note with noteId
  app.put("/orders/:orderId/:itemId", orders.update);

  // Delete a Note with noteId
  app.delete("/orders/:orderId", orders.delete);

  app.delete("/orders/:orderId/:itemId", orders.itemdelete);
};
