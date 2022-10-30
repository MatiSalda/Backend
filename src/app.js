import express,{response} from 'express'
import fs from 'fs'
import Contenedor from '../contenedor.js'

const app = express()
const server = app.listen(8080, () => console.log("Listening on Express"))

const returnProducts = (route) => {
    if (fs.existsSync(route)) {
        let data = fs.readFileSync(route, 'utf-8')
        let productos = JSON.parse(data)
        return productos;
    } else {
        return {
            status: "Error",
            message: "No route found"
        }
    }
}

app.get('/',(req,res) => {
    res.send("<h1>Bienvenidos</h1>")
})

app.get('/productos', (req, res) => {              
    res.send(returnProducts('./productos.json'))
})

app.get('/productoRandom', (req,res) => {
    let productos = returnProducts('./productos.json')
    let numRandom = parseInt(Math.random() * productos.length)
    res.send(productos[numRandom])
})