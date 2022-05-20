const express = require('express')
const router = express.Router()
const auth = require("../../middleware/auth");

// @ROUTE       POST /api/seller/create-catalog
// @DESC        create catalog for seller
// @ACCESS      Private

router.post("/create-catalog", auth, (req, res) => {});

// @ROUTE       GET /api/seller/orders
// @DESC        Retrieve the list of orders received by a seller
// @ACCESS      Private

router.get("/orders", auth, (req, res) => {});

module.exports = router