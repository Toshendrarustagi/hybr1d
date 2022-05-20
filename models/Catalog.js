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
  // orders: [
  //     {
  //         orderId: {

  //         }
  //     }
  // ]
});

module.exports = Catalog = mongoose.model("catalog", catalogSchema);
