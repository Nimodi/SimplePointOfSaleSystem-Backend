//During the test the env variable is set to test
process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
const Order = require("../app/models/order.model.js");
const Item = require("../app/models/item.model.js");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe("Books", () => {
  beforeEach(done => {
    //Before each test we empty the database
    Order.remove({}, err => {
      done();
    });
  });
  /*
   * Test the /GET route
   */
  describe("/GET order", () => {
    it("it should GET all the orders", done => {
      chai
        .request(server)
        .get("/orders")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
});

//Get all items
describe("Items", () => {
  beforeEach(done => {
    //Before each test we empty the database
    Item.remove({}, err => {
      done();
    });
  });
  /*
   * Test the /GET route
   */
  describe("/GET item", () => {
    it("it should GET all the items", done => {
      chai
        .request(server)
        .get("/items")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
});

/*
 * Test the /GET route
 */
describe("/GET/:id order", () => {
  it("it should GET a order", done => {
    let order = new Order({
      customerName: "Saman",
      createdDate: "25/03/2019",
      items: [
        {
          Itemid: "5cbab330fcd98828cc3eef69",
          Qty: 1
        },
        {
          Itemid: "5cbb4399fbd1587076cadd57",
          Qty: 1
        },
        {
          Itemid: "5cbab30dfcd98828cc3eef68",
          Qty: 1
        }
      ]
    });

    order.save((err, order) => {
      chai
        .request(server)
        .get("/orders/" + order.orderId)
        .send(order)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("customerName");
          res.body.should.have.property("createdDate");
          res.body.should.have.property("items");
          res.body.should.have.property("_id").eql(order.orderId);
          done();
        });
    });
  });
});

/*
 * Test the /POST route
 */
describe("/POST order", () => {
  it("it should POST a order ", done => {
    let order = {
      _id: "5cbb4aa3fbd1587076cadd5x",
      customerName: "Gunapala",
      createdDate: "20/03/2019",
      items: [
        {
          _id: "5cbdb55bc2b5865c0241859b",
          Itemid: "5cbab330fcd98828cc3eef69",
          Qty: 1
        },
        {
          _id: "5cbdc0a2c2b5865c024185aa",
          Itemid: "5cbb4399fbd1587076cadd57",
          Qty: 5
        }
      ]
    };
    chai
      .request(server)
      .post("/orders")
      .send(order)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have
          .property("message")
          .eql("Order successfully added!");
        res.body.order.should.have.property("_id");
        res.body.order.should.have.property(" customerName");
        res.body.order.should.have.property("createdDate");
        res.body.order.should.have.property(" items");

        done();
      });
  });
});

/*
 * Test the /DELETE/:id route
 */
describe("/DELETE/:id book", () => {
  it("it should DELETE a book given the id", done => {
    let order = {
      customerName: "Gunapala",
      createdDate: "20/03/2019",
      items: [
        {
          Itemid: "5cbab330fcd98828cc3eef69",
          Qty: 1
        },
        {
          Itemid: "5cbb4399fbd1587076cadd57",
          Qty: 5
        }
      ]
    };
    order.save((err, order) => {
      chai
        .request(server)
        .delete("/order/" + order._id + "/" + order.items.Itemid)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql("Book successfully deleted!");
          res.body.result.should.have.property("ok").eql(1);
          res.body.result.should.have.property("n").eql(1);
          done();
        });
    });
  });
});
