const express = require('express')
const cors = require('cors')
const app = express()

const {initializeDatabase} = require("./db/db.connection")
const { Products } = require("./models/products.model")

app.use(cors());
app.use(express.json())

initializeDatabase()

const newData ={
    title:"Buy AirPods Max",
    description :"Requires AirPods Max with the latest version of software, and iPhone and iPod touch models with the latest version of iOS",
    category : "electronic",
    rating: 3,
    price:1211,
    imageUrl:'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/airpods-max-select-202409-blue_FV1?wid=976&hei=916&fmt=jpeg&qlt=90&.v=1724927052173',
    isWishlist:false,
    isCart: false
}
async function seedData (newData){
try{
const data = new Products(newData)
const save = await data.save()
console.log(save)
}catch(error){
    throw error
}
}
seedData(newData)

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
app.get("/products/isWishlist/:wishlist",async(req,res)=>{
    const wishlistValue = req.params.wishlist
    
    try{
const products = await Products.find({isWishlist:wishlistValue})
if(products.length !=0){
    res.json(products)
}else{
    res.status(404).json({error:"No product found"})
}
    }catch(error){
        res.status(500).json({error:"Internal server error"})
    }
})
app.put("/products/:id",async(req,res)=>{
    const productId = req.params.id
    const updateData = req.body
try{
    const updatedProducts = await Products.findByIdAndUpdate(productId,updateData,{new:true})
    console.log(updatedProducts)
    if(!updatedProducts){
        return res.status(404).json({message:"Product not found"})
    }
    res.status(202).json(updatedProducts)
}catch(error){
    res.status(500).json({error:"Internal server error"})
}
})
app.post("/products",async(req, res)=>{

    const product = req.body
    
    try{
        const products = new Products(product)
        await products.save()
        console.log(products)
        res.status(201).json({message:"Product added successfully",product:products})
    }catch(error){
        res.status(500).json({error:"Internal server error"})
    }
})

const PORT = 3000;
app.listen(PORT,()=>{console.log(`Serever is running on Port ${PORT}`)})

