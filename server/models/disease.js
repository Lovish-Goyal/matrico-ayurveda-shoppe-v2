const mongoose = require("mongoose");

const diseaseSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  herbs: [{ type: String }],
  medicineName: { type: String },
  image: { type: String },
  link: { type: String },
  youtubeVideo: { type: String },
  ayurvedicUpchar: [{ type: String }],
  usage: [{ type: String }],
  duration: [{ type: String }],
  ayurvedicMedicine: {
    name: { type: String },
    brand: { type: String },
    form: { type: String },
    netWeight: { type: String },
    price: { type: String },
    image: { type: String },
    link: { type: String },
    ingredients: [{ type: String }],
    benefits: [{ type: String }],
    dosage: {
      standard: { type: String },
      increased: { type: String },
      administration: { type: String }
    },
    safetyInformation: {
      sideEffects: { type: String },
      precautions: [{ type: String }]
    },
    purchaseLinks: [{ type: String }]
  }
}, { timestamps: true });

module.exports = mongoose.model("Disease", diseaseSchema);
