// app.js

import express from 'express';
import ProductManager from '../src/data/files/ProductManager.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

const app = express();
const PORT = 8080;

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Crear una instancia de ProductManager
const productManager = new ProductManager('products.json');

// Ruta para obtener todos los productos
app.get('/products', (req, res) => {
    const limit = req.query.limit; // Obtener el parámetro "limit" de la consulta
    const products = productManager.getProducts();
    if (limit) {
        const limitedProducts = products.slice(0, limit); // Obtener solo los primeros "limit" productos
        res.json(limitedProducts);
    } else {
        res.json(products); // Si no se especifica limit, devolver todos los productos
    }
});
// Ruta para obtener un producto por su ID
app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    try {
        const product = productManager.getProductById(productId);
        res.json(product);
    } catch (error) {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});


// Ruta para agregar un nuevo producto
app.post('/products', (req, res) => {
    const productData = req.body;
    try {
        productManager.addProduct(productData);
        res.status(201).json({ message: 'Producto agregado correctamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
