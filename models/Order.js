const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  orderList: [
    {
      sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "catalog",
      },

      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "catalog",
      },

      productName: {
        type: String,
        required: true,
      },

      productPrice: {
        type: Number,
        required: true,
      },

      numberOfItem: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = Order = mongoose.model("order", orderSchema);
