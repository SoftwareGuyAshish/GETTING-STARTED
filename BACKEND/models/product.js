const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 56,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      maxlength: 1000,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      maxlength: 1000,
      required: true,
      trim: true,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    sold: {
      default: 0,
      type: Number,
    },
    stock: {
      type: Number,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
