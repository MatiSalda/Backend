import {request, Router} from 'express'
import Contenedor from "../Contenedor/contenedor.js"
import uploader from '../servicios/upload.js'

const router = Router()
const contenedor = new Contenedor

router.get('/', async (req,res)=>{
   let all =  await contenedor.getAll()
    res.send(all)
})

router.get('/:id', async (req,res)=>{
    const id = req.params.id
    let getId = await contenedor.getById(id)
    res.send(getId)
})


router.post('/', uploader.single('imagen'), async (req,res)=>{
    let image = ""
    if (req.file) {
        image = req.protocol + "://" + req.hostname + ":8080/images/" + req.file.filename
    }
    let producto = req.body;
    if ((producto.nombre && producto.precio) != '') {
        producto.imagen = image;
        const result = await contenedor.save(producto)
        res.send({ product: result })
    } else {
        res.send({ status: "error", message: "faltan completar campos obligatorios" })
    }
})

router.put('/:id', async (req,res)=>{
    const id = req.params.id
    const productoBody = req.body

    let result = await contenedor.actualizarProducto(productoBody, id)
    res.send(result)
})

router.delete('/:id',  (req, res) => {
    const id = req.params.id
    
    res.send(contenedor.deleteById(id))
})

export default router