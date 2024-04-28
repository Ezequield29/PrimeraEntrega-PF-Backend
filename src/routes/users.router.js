import { Router } from "express";
import { uploader } from "../utils";
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
})
export default router;