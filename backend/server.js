const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 5000;
const DB_FILE = "db.json";

app.use(cors());
app.use(express.json());

// Utility to read database
function readDB() {
  return JSON.parse(fs.readFileSync(DB_FILE));
}

// Utility to write database
function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// Get all products
app.get("/products", (req, res) => {
  const db = readDB();
  res.json(db.products);
});

// Add product
app.post("/products", (req, res) => {
  const db = readDB();
  const newProduct = { id: Date.now(), ...req.body };
  db.products.push(newProduct);
  writeDB(db);
  res.json(newProduct);
});

// Update product
app.put("/products/:id", (req, res) => {
  const db = readDB();
  const productId = parseInt(req.params.id);
  const index = db.products.findIndex(p => p.id === productId);
  if (index !== -1) {
    db.products[index] = { ...db.products[index], ...req.body };
    writeDB(db);
    res.json(db.products[index]);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

// Delete product
app.delete("/products/:id", (req, res) => {
  const db = readDB();
  const productId = parseInt(req.params.id);
  db.products = db.products.filter(p => p.id !== productId);
  writeDB(db);
  res.json({ message: "Product deleted" });
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});