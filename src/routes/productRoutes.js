import { Router } from "express";
import express from 'express';
import ProductManager from '../data/files/ProductManager.js';
const router = express.Router();
const productManager = new ProductManager('products.json'); 
router.get('/', (req, res) => {
  const products = productManager.getProducts();
  res.json(products);
});
router.get('/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);
  try {
      const product = productManager.getProductById(productId);
      res.json(product);
  } catch (error) {
      res.status(404).json({ error: 'Producto no encontrado' });
  }
});
router.post('/', (req, res) => {
  const productData = req.body;
  try {
      productManager.addProduct(productData);
      res.status(201).json({ message: 'Producto agregado correctamente' });
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
});
router.put('/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);
  const updates = req.body;
  try {
      const updatedProduct = productManager.updateProduct(productId, updates);
      res.json(updatedProduct);
  } catch (error) {
      res.status(404).json({ error: 'Producto no encontrado' });
  }
});
router.delete('/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);
  try {
      const deletedProduct = productManager.deleteProduct(productId);
      res.json(deletedProduct);
  } catch (error) {
      res.status(404).json({ error: 'Producto no encontrado' });
  }
});
export default router;