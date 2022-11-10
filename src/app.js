import express from 'express'
import __dirname from './utils.js'
import handlebars from 'express-handlebars'
import productosRouter from './routes/productos.router.js'
import viewsRouter from './routes/views.router.js'

const app = express()
app.listen(8080, () => console.log("Escuchando :D"))

app.use(express.static(__dirname+'/public'))
app.use(express.json());

// app.use('/api/productos',productosRouter)

app.engine('handlebars',handlebars.engine())
app.set('views',__dirname +'/views')
app.set('view engine', 'handlebars')

app.use('/',productosRouter)
app.use('/productos',productosRouter)