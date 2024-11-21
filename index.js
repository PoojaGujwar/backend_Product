const express = require('express')
const cors = require('cors')
const app = express()

const {initializeDatabase} = require("./db/db.connection")
const { Products } = require("./models/products.model")

app.use(cors());
app.use(express.json())

initializeDatabase()

app.get("/",(req,res)=>{
    res.send("Hello, Epress")
})

app.get("/products",async(req,res)=>{
    try{
        const product = await Products.find()
        res.json(product)
    }catch(error){
        res.status(500).json({error:"Internal server error"})
    }
})
app.get("/products/:id", async(req,res)=>{
    const productId = req.params.id
    try{
        const productById = await Products.findById(productId)
        res.json(productById)
    }catch(error){
        res.status(500).json({error:"Internal server error"})
    }
})

app.get("/products/category/:categories", async(req,res)=>{
    const productCategories = req.params.categories
    try{
        const products = await Products.find({category:productCategories})
        if(products.length !=0){
            res.json(products)
        }else{
            res.status(400).json({error:"No Product found"})
        }
    }catch(error){
        res.status(500).json({error:"Internal server error"})
    }
})
app.get("/products/ratings/:rating", async(req,res)=>{
    const productRating = req.params.rating
    try{
        const products = await Products.find({rating:productRating})
        if(products.length !=0){
            res.json(products)
        }else{
            res.status(400).json({error:"No Product found"})
        }
    }catch(error){
        res.status(500).json({error:"Internal server error"})
    }
})
app.post("/products",async(req, res)=>{
    const product = req.body
    try{
        const products = new Products(product)
        await products.save()
        res.status(201).json({message:"Product added successfully",product:products})
    }catch(error){
        res.status(500).json({error:"Internal server error"})
    }
})

const PORT = 3000;
app.listen(PORT,()=>{console.log(`Serever is running on Port ${PORT}`)})

