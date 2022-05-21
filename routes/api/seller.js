const express = require('express')
const router = express.Router()
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Catalog = require("../../models/Catalog");
const User = require("../../models/User");

// @ROUTE       POST /api/seller/create-catalog
// @DESC        create catalog for seller
// @ACCESS      Private

router.post("/create-catalog", auth, async (req, res) => {
  try {
    const user = await User.findOne({ id: req.user.id }).select("-password");
    console.log(user);
    if (!user) {
      return res.status(400).json({ msg: "Invalid user" });
    }
    if (!user.isSeller) {
      return res.status(400).json({ msg: "Invalid user" });
    }

    let catalogCreate = await Catalog.findOne({ sellerId: req.user.id });
    if (!catalogCreate) {
      catalogCreate = new Catalog({
        sellerId: req.user.id,
        products: req.body,
      });
    } else {
      catalogCreate.products.concat(req.body);
    }
    await catalogCreate.save();
    res.status(200).json(catalogCreate);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("server error");
  }
});

// @ROUTE       GET /api/seller/orders
// @DESC        Retrieve the list of orders received by a seller
// @ACCESS      Private

router.get("/orders", auth, (req, res) => {});

module.exports = router