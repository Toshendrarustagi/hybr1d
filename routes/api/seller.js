const express = require('express')
const router = express.Router()
const auth = require("../../middleware/auth");
const { body, check, validationResult } = require("express-validator");
const Catalog = require("../../models/Catalog");
const User = require("../../models/User");
const Order = require("../../models/Order");

// @ROUTE       POST /api/seller/create-catalog
// @DESC        create catalog for seller
// @ACCESS      Private

router.post(
  "/create-catalog",
  auth,
  // validating input
  [
    body().isArray(),
    body("*.productName", "Product name is required").notEmpty(),
    body("*.productPrice", "product price must be a number")
      .exists()
      .isNumeric(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // checking if user exists then, checking user is a seller or not
      const user = await User.findOne({ _id: req.user.id }).select("-password");
      console.log(user);
      if (!user) {
        return res.status(400).json({ msg: "Invalid user" });
      }
      if (!user.isSeller) {
        return res.status(400).json({ msg: "Invalid user" });
      }

      // creating catalog for seller
      let catalogCreate = await Catalog.findOne({ sellerId: req.user.id });
      if (!catalogCreate) {
        catalogCreate = new Catalog({
          sellerId: req.user.id,
          products: req.body,
        });
      } else {
        catalogCreate.products.unshift(req.body);
      }
      await catalogCreate.save();
      res.status(200).json(catalogCreate);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("server error");
    }
  }
);

// @ROUTE       GET /api/seller/orders
// @DESC        Retrieve the list of orders received by a seller
// @ACCESS      Private

router.get("/orders", auth, async (req, res) => {
  try {
    let seller = await Order.findOne({ sellerId: req.user.id });
    if (!seller) {
      return res.status(400).json({ msg: "seller not found" });
    }
    return res.json(seller);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("server error");
  }
});

module.exports = router