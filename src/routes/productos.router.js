import {request, Router} from 'express'
import Contenedor from "../Contenedor/contenedor.js"

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

router.delete('/:id',  (req, res) => {
    const id = req.params.id
    
    res.send(contenedor.deleteById(id))
})

export default router