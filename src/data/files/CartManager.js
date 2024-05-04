import fs from 'fs';
class CartManager {
    constructor(filePath) {
        this.path = filePath;
    }
    generateCartId() {  
        return Date.now().toString();
    }
    saveCart(cart) {
        try {
            fs.writeFileSync(this.path, JSON.stringify(cart, null, 2));
        } catch (error) {
            throw new Error(`Error al guardar el carrito: ${error.message}`);
        }
    }
    getCartById(cartId) {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            const carts = JSON.parse(data);
            const cart = carts.find(cart => cart.id === cartId);
            return cart || null;
        } catch (error) {
            throw new Error(`Error al obtener el carrito: ${error.message}`);
        }
    }
    addToCart(cart, productId, quantity) {  
        const productIndex = cart.products.findIndex(product => product.id === productId);
        if (productIndex !== -1) {
        
            cart.products[productIndex].quantity += quantity;
        } else {
         
            cart.products.push({ id: productId, quantity });
        }
    }
}
export default CartManager;
