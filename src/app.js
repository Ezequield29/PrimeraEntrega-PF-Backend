import express from 'express';
import http from 'http';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import ProductManager from './data/files/ProductManager.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import viewsRouter from './routes/views.router.js';
import __dirname from './utils.js';

const app = express();
const PORT = 8080;

const httpServer = http.createServer(app);
const socketServer = new Server(httpServer);

app.engine('handlebars', handlebars.engine({ defaultLayout: false }));
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.use('/', viewsRouter);
app.get('/home', (req, res) => {
    res.render('home');
});


const productManager = new ProductManager('products.json');

socketServer.on('connection', socket => {
    console.log("Nuevo cliente conectado");

    socket.on('crearProducto', producto => {
        productManager.addProduct(producto);
        socketServer.emit('productosActualizados', productManager.getProducts());
    });

    socket.on('eliminarProducto', productoId => {
        productManager.deleteProduct(productoId);
        socketServer.emit('productosActualizados', productManager.getProducts());
    });
});

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

httpServer.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

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
        socketServer.emit('productosActualizados', productManager.getProducts());
        res.status(201).json({ message: 'Producto agregado correctamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
