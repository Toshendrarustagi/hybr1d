const express = require('express')
const router = express.Router()
const Catalog = require("../../models/Catalog");
const User = require("../../models/User");
const auth = require("../../middleware/auth");
const Order = require("../../models/Order");

// @ROUTE   GET /api/buyer/list-of-sellers
// @DESC    get list of sellers
// @ACCESS  public

router.get("/list-of-sellers", async (req, res) => {
  try {
    const listSeller = await User.find({ isSeller: true }).select([
      "-password",
      "-_id",
    ]);
    return res.status(200).json(listSeller);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("server error");
  }
});

// @ROUTE   GET /api/buyer/seller-catalog/:seller_id
// @DESC    Get the catalog of a seller by seller_id
// @ACCESS  public

router.get("/seller-catalog/:seller_id", async (req, res) => {
  try {
    const sellerId = req.params.seller_id;
    const catalogSellerId = await Catalog.findOne({ sellerId });
    if (!catalogSellerId) {
      return res.status(404).json({ errors: [{ msg: "No seller found" }] });
    } else return res.json(catalogSellerId);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("server error");
  }
});

// @ROUTE   POST /api/buyer/create-order/:seller_id
// @DESC    Send a list of items to create an order for seller with id = seller_id
// @ACCESS  private

router.post("/create-order/:seller_id", auth, async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.seller_id });
    if (!user) {
      return res.status(400).json({ msg: "seller not found" });
    }
    if (!user.isSeller) {
      return res.status(400).json({ msg: "not a seller" });
    }
    const catalog = await Catalog.findOne({ sellerId: req.params.seller_id });
    let validOrder = req.body;
    let temp = 0;
    validOrder.forEach((element) => {
      let valid = 0;
      catalog.products.forEach((prod) => {
        if (
          prod.productName === element.productName &&
          prod.productQuantity >= element.productQuantity
        ) {
          valid = 1;
        }
      });
      if (valid === 0) {
        temp = 1;
      }
    });

    if (temp === 1) {
      return res.status(400).send({ msg: "wrong items" });
    }
    validOrder.forEach((element) => {
      catalog.products.forEach((prod) => {
        if (
          prod.productName === element.productName &&
          prod.productQuantity >= element.productQuantity
        ) {
          prod.productQuantity = prod.productQuantity - element.productQuantity;
        }
      });
    });

    validOrder.map((element) => {
      element["buyerId"] = req.user.id;
    });

    let order = new Order({
      sellerId: req.params.seller_id,
      orderList: validOrder,
    });
    await order.save();
    await catalog.save();
    return res.json(order);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("server error");
  }
});

module.exports = router