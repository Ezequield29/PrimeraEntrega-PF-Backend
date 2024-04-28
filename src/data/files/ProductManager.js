import fs from 'fs';

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.products = [];
        this.nextId = 1;

        
        this.loadProducts();
    }

    
    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            this.products = JSON.parse(data);
            
            const maxId = this.products.reduce((max, product) => (product.id > max ? product.id : max), 0);
            this.nextId = maxId + 1;
        } catch (error) {
            
            fs.writeFileSync(this.path, '[]');
        }
    }

    
    saveProducts() {
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
    }

    getProducts() {
        return this.products;
    }

    addProduct(product) {
        
        product.id = this.nextId++;
        this.products.push(product);
        this.saveProducts(); 
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            throw new Error("Producto no encontrado.");
        }
        return product;
    }

    updateProduct(id, updates) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) {
            throw new Error("Producto no encontrado.");
        }

        
        this.products[productIndex] = {
            ...this.products[productIndex],
            ...updates
        };

        this.saveProducts(); 
        return this.products[productIndex];
    }

    deleteProduct(id) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) {
            throw new Error("Producto no encontrado.");
        }

        
        const deletedProduct = this.products.splice(productIndex, 1)[0];
        this.saveProducts(); 
        return deletedProduct;
    }
}

export default ProductManager;
