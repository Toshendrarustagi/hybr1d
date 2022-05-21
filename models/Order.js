const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  // buyerId: {
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  orderList: [
    {
      //sellerId: {
      buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "catalog",
      },

      productName: {
        type: String,
        required: true,
      },

      productQuantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = Order = mongoose.model("order", orderSchema);
