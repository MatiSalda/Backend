import {Router} from 'express'
import Contenedor from '../contenedor.js'

const router = Router()
const contenedor = new Contenedor

router.get('/', (req,res)=>{
   
    res.send(contenedor.getAll())
})

router.get('/:id', (req,res)=>{
    const id = request.params.id
    res.send(contenedor.getById(id))
})

router.delete('/:id',  (req, res) => {
    const id = request.params.id
    
    response.send(contenedor.deleteById(id))
})

export default router