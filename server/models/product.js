const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  imageSrc: { type: String },
  link: { type: String },
  description: { type: String },
  price: { type: String },
  availability: { type: String, default: "In Stock" },
  reviews: { type: String },
  ingredients: { type: String },
  dosage: { type: String },
  precautions: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
