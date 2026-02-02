import express from "express";

export const productApp = express.Router();

let products = [];

// GET all products
productApp.get("/products", (req, res) => {
  res.json({ message: "products", payload: products });
});

// CREATE product
productApp.post("/products", (req, res) => {
  products.push(req.body);
  res.status(201).json({ message: "product created" });
});

// GET product by ID
productApp.get("/products/:id", (req, res) => {
  let id = Number(req.params.id);
  let product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ message: "product not found" });
  }

  res.json({ message: "product found", payload: product });
});

// UPDATE product
productApp.put("/products/:id", (req, res) => {
  let id = Number(req.params.id);
  let index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "product not found" });
  }

  products[index] = { ...req.body, id };
  res.json({ message: "product updated" });
});

// DELETE product
productApp.delete("/products/:id", (req, res) => {
  let id = Number(req.params.id);
  let index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "product not found" });
  }

  products.splice(index, 1);
  res.json({ message: "product deleted" });
});
