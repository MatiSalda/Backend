import express from 'express'
import __dirname from './utils.js'
import productosRouter from './routes/productos.router.js'

const app = express()
app.listen(8080, () => console.log("Escuchando :D"))

app.use(express.static(__dirname+'/public'))
app.use(express.json());

app.use('/api/productos',productosRouter)

