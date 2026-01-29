const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  categories: { type: [String], default: [] }
});

module.exports = mongoose.model("Product", ProductSchema);
