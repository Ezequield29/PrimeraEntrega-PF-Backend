import { Router } from "express";
import ProductManager from "../data/files/ProductManager" // Asegúrate de tener la ruta correcta


const router = express.Router();
const productManager = new ProductManager('products.json'); // Ajusta la ruta del archivo JSON si es necesario

// Ruta para obtener todos los productos
router.get('/', (req, res) => {
  const products = productManager.getProducts();
  res.json(products);
});

// Ruta para obtener un producto por su ID
router.get('/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);
  try {
      const product = productManager.getProductById(productId);
      res.json(product);
  } catch (error) {
      res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// Ruta para agregar un nuevo producto
router.post('/', (req, res) => {
  const productData = req.body;
  try {
      productManager.addProduct(productData);
      res.status(201).json({ message: 'Producto agregado correctamente' });
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
});

// Ruta para actualizar un producto por su ID
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

// Ruta para eliminar un producto por su ID
router.delete('/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);
  try {
      const deletedProduct = productManager.deleteProduct(productId);
      res.json(deletedProduct);
  } catch (error) {
      res.status(404).json({ error: 'Producto no encontrado' });
  }
});




/* import { uploader } from "../utils";
const router = Router();
let users =[];
router.get("/", (req, res) => {
  //Cuerpo del servicio para GET users
  res.send({status:"succes",payload:users})
});
router.post("/",uploader.single("file"),(req,res)=>{
    if(!req.file){//Si no existe req.file, significa que hubo un error al subir el archivo
        //queda en tus manos decidir si puede continuar con el proceso o no
        res.status(400).send({status:"error",error:"no se pudo guardar la imagen"})
    }
    console.log(req.file);//Revisar los comapos que vienen en req.file por parte de multer
    //El resto del cuerpo del usuario a agregar vivira en req.body, como es usual
    let user = (req.file);
    user.profile=req.file.path;
    users.push(user);
    res.send({status:"succes",message:"User created"})
}) */
export default router;