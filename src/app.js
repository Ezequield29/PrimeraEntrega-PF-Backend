import express from 'express';
import ProductManager from './data/files/ProductManager.js';
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
const productManager = new ProductManager('products.json');
app.get('/products', (req, res) => {
    const limit = req.query.limit;
    const products = productManager.getProducts();
    if (limit) {
        const limitedProducts = products.slice(0, limit); 
        res.json(limitedProducts);
    } else {
        res.json(products); 
    }
});
app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    try {
        const product = productManager.getProductById(productId);
        res.json(product);
    } catch (error) {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});
app.post('/products', (req, res) => {
    const productData = req.body;
    try {
        productManager.addProduct(productData);
        res.status(201).json({ message: 'Producto agregado correctamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});