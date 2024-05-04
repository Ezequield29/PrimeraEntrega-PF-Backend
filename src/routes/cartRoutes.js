import express from 'express';
import CartManager from '../data/files/CartManager.js';

const router = express.Router();
const cartManager = new CartManager('cart.json'); 
router.post('/', (req, res) => {
    try {
        const cartId = cartManager.generateCartId(); 
        const newCart = { id: cartId, products: [] };
        cartManager.saveCart(newCart); 
        res.status(201).json({ message: 'Nuevo carrito creado', cartId });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el carrito' });
    }
});
router.get('/:cid', (req, res) => {
    const cartId = req.params.cid;
    try {
        const cart = cartManager.getCartById(cartId); 
        res.json(cart.products);
    } catch (error) {
        res.status(404).json({ error: 'Carrito no encontrado' });
    }
});
router.post('/:cid/product/:pid', (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = parseInt(req.body.quantity || 1);
    try {
        const cart = cartManager.getCartById(cartId);
        const updatedCart = cartManager.addToCart(cart, productId, quantity);
        cartManager.saveCart(updatedCart); 
        res.status(201).json({ message: 'Producto agregado al carrito' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
export default router;

