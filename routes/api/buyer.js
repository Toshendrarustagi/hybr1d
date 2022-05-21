const express = require('express')
const router = express.Router()
const Catalog = require("../../models/Catalog");
const User = require("../../models/User");
const auth = require("../../middleware/auth");

// @ROUTE   GET /api/seller/list-of-sellers
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

// @ROUTE   GET /api/seller/seller-catalog/:seller_id
// @DESC    Get the catalog of a seller by seller_id
// @ACCESS  public

router.get("/seller-catalog/:seller_id", async (req, res) => {
  try {
    const catalogSellerId = await Catalog.findOne({
      sellerId: req.params.seller_id,
    });
    if (!catalogSellerId) {
      return res.status(404).json({ errors: [{ msg: "No seller found" }] });
    } else return res.json(catalogSellerId);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("server error");
  }
});

// @ROUTE   POST /api/seller/create-order/:seller_id
// @DESC    Send a list of items to create an order for seller with id = seller_id
// @ACCESS  private

router.get("/create-order/:seller_id", auth, (req, res) => {});

module.exports = router