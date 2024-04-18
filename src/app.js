
import employeesRoutes from "./routes/employees.routes.js";
//const express = require("express");
import express from "express";
//const morgan = require("morgan");
import morgan from "morgan";

const app = express();
let products = [
  {
    id: 1,
    name: "laptop",
    price: 3000,
  },
  {
    id: 2,
    name: "mouse",
    price: 200,
  },
];
app.use(morgan("dev"));
app.use(express.json());

app.get("/products", (req, res) => {
  res.json(products);
});

app.post("/products", (req, res) => {
  const newProduct = { id: products.length + 1, ...req.body };
  products.push(newProduct);
  res.json(newProduct);
});

app.put("/products", (req, res) => {
  res.send("actualizando products");
});

app.delete("/products/:id", (req, res) => {
  const searchProduct = products.find(
    (product) => product.id === parseInt(req.params.id)
  );
  if (!searchProduct) {
    return res.status(400).json({ message: "Not found" });
  }
  products = products.filter(
    (product) => product.id != parseInt(req.params.id)
  );
  res.sendStatus(204);
});

app.get("/products/:id", (req, res) => {
  const searchProduct = products.find(
    (product) => product.id === parseInt(req.params.id)
  );
  if (!searchProduct) {
    return res.status(400).json({ message: "Not found" });
  }
  res.json(searchProduct);
});

app.use("/api/", employeesRoutes);

app.use((req, res, next) => {
  res.status(400).json({ message: "Endpoint not found" });
});

export default app;