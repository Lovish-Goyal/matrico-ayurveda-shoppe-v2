const express = require("express");
const Product = require("../models/product");
const Disease = require("../models/disease");
const aiController = require("../controllers/aiController");

const router = express.Router();

// AI Consultation proxy
router.post("/ai/consult", aiController.consult);

// List all products / simple filter search
router.get("/products", async (req, res) => {
  try {
    const { q } = req.query;
    let query = {};
    if (q && q.trim()) {
      query = {
        $or: [
          { name: { $regex: q.trim(), $options: "i" } },
          { description: { $regex: q.trim(), $options: "i" } },
        ],
      };
    }
    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// List all diseases / symptoms
router.get("/diseases", async (req, res) => {
  try {
    const { q } = req.query;
    let query = {};
    if (q && q.trim()) {
      query = { name: { $regex: q.trim(), $options: "i" } };
    }
    const diseases = await Disease.find(query);
    res.json(diseases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Unified search (returns both matching products and diseases)
router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || !q.trim()) {
      return res.json({ products: [], diseases: [] });
    }
    const term = q.trim();

    // Concurrent queries
    const [products, diseases] = await Promise.all([
      Product.find({
        $or: [
          { name: { $regex: term, $options: "i" } },
          { description: { $regex: term, $options: "i" } },
        ],
      }).limit(10),
      Disease.find({
        $or: [
          { name: { $regex: term, $options: "i" } },
          { herbs: { $regex: term, $options: "i" } },
          { medicineName: { $regex: term, $options: "i" } },
        ],
      }).limit(10),
    ]);

    res.json({ products, diseases });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
