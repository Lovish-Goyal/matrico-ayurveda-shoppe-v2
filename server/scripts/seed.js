const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const Product = require("../models/product");
const Disease = require("../models/disease");
const productsData = require("../data/products");

require("dotenv").config({ path: path.join(__dirname, "../.env") });

const MONGO_URI =
  process.env.MONGO_URI_CLUSTER || "mongodb://127.0.0.1:27017/matrico_ayurveda_shoppee";

async function seed() {
  try {
    console.log("Connecting to MongoDB at:", MONGO_URI);
    await mongoose.connect(MONGO_URI, {
      dbName: "matrico_ayurveda_shoppee",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected.");

    // Clean current database data
    await Product.deleteMany({});
    await Disease.deleteMany({});
    console.log("Cleared existing products and diseases collections.");

    // Insert Products
    const productsToInsert = productsData.map((img) => ({
      name: img.name,
      imageSrc: img.src,
      link: img.link,
      description: img.description,
      price: img.price,
      availability: img.availability || "In Stock",
      reviews: img.reviews,
      ingredients: img.ingredients,
      dosage: img.dosage,
      precautions: img.precautions,
    }));
    const insertedProducts = await Product.insertMany(productsToInsert);
    console.log(`Successfully seeded ${insertedProducts.length} products into MongoDB.`);

    // Load and seed diseases from backend data
    const symptoms = require("../data/diseases.js");
    console.log(`Extracted ${symptoms.length} symptoms/diseases from diseases.js.`);

    // Insert Diseases
    const diseasesToInsert = symptoms.map((sym) => {
      const dbSym = {
        name: sym.name,
        herbs: sym.Herbs,
        medicineName: sym.medicine,
        image: sym.image,
        link: sym.link,
        youtubeVideo: sym.youtubeVideo,
        ayurvedicUpchar: sym.ayurvedic_upchar,
        usage: sym.usage,
        duration: sym.duration,
      };

      if (sym.ayurvedic_medicine) {
        dbSym.ayurvedicMedicine = {
          name: sym.ayurvedic_medicine.name,
          brand: sym.ayurvedic_medicine.brand,
          form: sym.ayurvedic_medicine.form,
          netWeight: sym.ayurvedic_medicine.net_weight,
          price: sym.ayurvedic_medicine.price,
          image: sym.ayurvedic_medicine.image,
          link: sym.ayurvedic_medicine.link,
          ingredients: sym.ayurvedic_medicine.ingredients,
          benefits: sym.ayurvedic_medicine.benefits,
          dosage: {
            standard: sym.ayurvedic_medicine.dosage?.standard,
            increased: sym.ayurvedic_medicine.dosage?.increased,
            administration: sym.ayurvedic_medicine.dosage?.administration,
          },
          safetyInformation: {
            sideEffects: sym.ayurvedic_medicine.safety_information?.side_effects,
            precautions: sym.ayurvedic_medicine.safety_information?.precautions,
          },
          purchaseLinks: sym.ayurvedic_medicine.purchase_links,
        };
      }
      return dbSym;
    });

    const insertedDiseases = await Disease.insertMany(diseasesToInsert);
    console.log(`Successfully seeded ${insertedDiseases.length} diseases/symptoms into MongoDB.`);

    console.log("Database seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
}

seed();
