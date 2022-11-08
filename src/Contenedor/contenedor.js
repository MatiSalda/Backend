import fs from 'fs'
import __dirname from "../utils.js"

const pathTofile= __dirname + "/files/productos.json"


class Contenedor {
    save= async(producto) => {
        if(!producto.nombre || !producto.precio || !producto.foto){
            return{
                status: "error",
                message: "Campos requeridos incompletos"
            }
            
        }
        try {
            if(fs.existsSync(pathTofile)){
                let data = await fs.promises.readFile(pathTofile,"utf-8")
                let productos = JSON.parse(data)
                let id = productos.length+1 
                producto.id=id
                productos.push(producto)
                await fs.promises.writeFile(pathTofile, JSON.stringify(productos, null, 2))
                return{
                    status:"success",
                    message:"Producto creado correctamente"
                }

            } else {
                producto.id =1
                await fs.promises.writeFile(
                    pathTofile,
                    JSON.stringify([producto],null,2)
                )
                return{
                    status: "success",
                    message: "Producto creado correctamente"
                }
            }
        } catch (error){
            return{
                status:"error",
                message:error.message
            }
        }
    }
    getAll= async () => {
        try{
            if(fs.existsSync(pathTofile)){
                let data = await fs.promises.readFile(pathTofile,"utf-8")
                let productos = JSON.parse(data)
                return{
                    status:"success",
                    productos:productos
                }
            } else {
                return {
                    status:"error",
                    message:"No se encontraron productos"
                }
            }
        }catch(error){
            return{
                status:"error",
                message:error.message
            }
        }
    }

    getById = async(id) =>{
        if(!id){
            return{
                status:"error",
                message:"Se necesita un ID"
            }
        }
        if(fs.existsSync(pathTofile)){
            let data= await fs.promises.readFile(pathTofile, "utf-8")
            let productos= JSON.parse(data)
            let producto =productos.find((producto) => producto.id == id)
            if(producto){
                return{
                    status:"success",
                    producto:producto
                }
            } else{
                return{
                    status:"error",
                    message:"Producto no encontrado"
                }
            }
        } else {
            return{
                status:"error",
                    message:"Producto no encontrado"
            }
        }
    }

    deleteById = async(id) => {
        if(!id){
            return{
                status:"error",
                message:"Se necesita un ID"
            }
        }
        if(fs.existsSync(pathTofile)){
            let data= await fs.promises.readFile(pathTofile, "utf-8")
            let productos= JSON.parse(data)
            let nuevoProductos = productos.filter((producto)=>producto.id != id)
            await fs.promises.writeFile(
                pathTofile,
                JSON.stringify(nuevoProductos,null,2)
            )
            return{
                status:"success",
                message:"Se borró el producto correctamente"
            }
        } else {
            return{
                status:"error",
                message:"Producto no encontrado"
            }
        }
    }

    deleteAll = async () =>{
        if(fs.existsSync(pathTofile)){
            let data= await fs.promises.readFile(pathTofile, "utf-8")
            let productos= JSON.parse(data)
            let vaciarArray = productos = []
            await fs.promises.writeFile(
                pathTofile,
                JSON.stringify(vaciarArray,null,2)
            )
            return{
                status:"success",
                message:"Se borraron los productos correctamente"
            }
        } else{
            return{
                status:"error",
                message:"No se pudo :("
            }
        }

    }
}


export default Contenedor