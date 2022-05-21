const mongoose = require("mongoose");

const catalogSchema = new mongoose.Schema({
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  products: [
    {
      productName: {
        type: String,
        required: true,
      },
      productPrice: {
        type: Number,
        required: true,
      },
      productQuantity: {
        type: Number,
        required: true,
      },
    },
  ],
  //   orders: [
  //     {
  //       orderId: {
  //         type: mongoose.Schema.Types.ObjectId,
  //         ref: "order",
  //       },
  //     },
  //   ],
});

module.exports = Catalog = mongoose.model("catalog", catalogSchema);
