import express from 'express';
import CartManager from './cartManager.js'; // Importa la clase CartManager

const router = express.Router();
const cartManager = new CartManager('cart.json'); // Instancia un objeto CartManager

// Ruta raíz para crear un nuevo carrito
router.post('/', (req, res) => {
    try {
        const cartId = cartManager.generateCartId(); // Utiliza el método generateCartId del CartManager
        const newCart = { id: cartId, products: [] };
        cartManager.saveCart(newCart); // Utiliza el método saveCart del CartManager
        res.status(201).json({ message: 'Nuevo carrito creado', cartId });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el carrito' });
    }
});

// Ruta para obtener los productos de un carrito por su ID
router.get('/:cid', (req, res) => {
    const cartId = req.params.cid;
    try {
        const cart = cartManager.getCartById(cartId); // Utiliza el método getCartById del CartManager
        res.json(cart.products);
    } catch (error) {
        res.status(404).json({ error: 'Carrito no encontrado' });
    }
});

// Ruta para agregar un producto a un carrito
router.post('/:cid/product/:pid', (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = parseInt(req.body.quantity || 1);

    try {
        const cart = cartManager.getCartById(cartId);
        const updatedCart = cartManager.addToCart(cart, productId, quantity); // Utiliza el método addToCart del CartManager
        cartManager.saveCart(updatedCart); // Utiliza el método saveCart del CartManager
        res.status(201).json({ message: 'Producto agregado al carrito' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;

