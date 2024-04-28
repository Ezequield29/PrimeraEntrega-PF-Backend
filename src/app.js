import express from 'express';
import ProductManager from './data/files/ProductManager.js';

const app = express();
const port = 8080;
//Indicamos que deseamos que public se vuelva estactico. En la ruta raiz se mostrara el index.html
// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor Express corriendo en http://localhost:${port}`);
});
app.get('/', (req, res) => {
    res.send('Bienvenido al servidor Express');
});
// Configurar el manejo de solicitudes JSON
app.use(express.json());

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
