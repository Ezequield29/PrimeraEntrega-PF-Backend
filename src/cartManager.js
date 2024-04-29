import fs from 'fs';

class CartManager {
    constructor(filePath) {
        this.path = filePath;
    }

    generateCartId() {
        // Implementa la lógica para generar un nuevo ID de carrito
        // Puedes usar un timestamp como ID único
        return Date.now().toString();
    }

    saveCart(cart) {
        // Implementa la lógica para guardar el carrito en el archivo cart.json
        try {
            fs.writeFileSync(this.path, JSON.stringify(cart, null, 2));
        } catch (error) {
            throw new Error(`Error al guardar el carrito: ${error.message}`);
        }
    }

    getCartById(cartId) {
        // Implementa la lógica para obtener un carrito por su ID desde el archivo cart.json
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
        // Implementa la lógica para agregar un producto al carrito y actualizar la cantidad si el producto ya existe
        const productIndex = cart.products.findIndex(product => product.id === productId);
        if (productIndex !== -1) {
            // Si el producto ya existe en el carrito, actualiza la cantidad
            cart.products[productIndex].quantity += quantity;
        } else {
            // Si el producto no existe, añádelo al carrito
            cart.products.push({ id: productId, quantity });
        }
    }
}

export default CartManager;
