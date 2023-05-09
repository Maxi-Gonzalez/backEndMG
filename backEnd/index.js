const express = require('express');
const path = require("path");
const ProductManager = require(`./productManager`)
const app = express()


// let products= new ProductManager()

// app.get('/', (req,res)=>{
//     res.send(`Hola con express`)
// })

// app.get('/products/:pid',(req,res)=>{
//     let id = req.params.pid
//     res.send(products.getProductById())
// })

// app.get('/products', (req,res)=>{
//     res.send (products.getProducts())
// })

app.listen(8080, () => {
    console.log("Server is run on port 8080");
  });