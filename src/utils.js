import multer from "multer";

const storage = multer.diskStorage({
destination: function(re,file,cb){
    cb(null,__dirname+"src/public/img")//especificamos la carpeta en este punto
},
//filname hara referencia al nombre final que contendra el archivo
filename: function(req,file,cb){
    cb(null,file.originalname)//originalmente indica que se conserve el nombre inicial
}
})
export const uploader = multer({storage});