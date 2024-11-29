const express = require('express')
const cors = require('cors')
const app = express()

const {initializeDatabase} = require("./db/db.connection")
const { Products } = require("./models/products.model")
const {Address} = require("./models/address.model")

app.use(cors());
app.use(express.json())

initializeDatabase()

const newData ={
   firstName:"John",
   lastName:"Doe",
   phoneNumber:1243567891,
   email:"johndoe@gmail.com",
   address:[{
    address:"Kolkata bajar",
    city:"kolkata",
    street:"kolkata",
    zipCode:700001,
}],
   
    author:'6747fc9425d53f0120006e8e'
}
async function seedData (newData){
try{
const data = new Address(newData)
const save = await data.save()
console.log(save)
}catch(error){
    throw error
}
}
//seedData(newData)

async function getAllAddress(){
    try{
        const addresses = await Address.find().populate("author")
    }catch(error){
        console.log(error)
    }
}
getAllAddress()

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

app.get("/address",async(req, res)=>{
    try{
        const newData = await Address.find().populate("author")
        res.json(newData)
    }catch(error){
        res.status(500).json({error:"Internal server error"})
    }
})
app.put("/address/:id",async(req,res)=>{
    const addressId = req.params.id
    const newAddress = req.body
    try{
        const data = await Address.findByIdAndUpdate(addressId,newAddress,{new:true})
        if(!data){
            return res.status(404).json({message:"Address not found"})
        }
        res.status(200).json(data)
    }catch(error){
        res.status(500).json({error:"Internal server error"})
    }
})
app.post("/address",async(req, res)=>{
try{
        const newInfo =  new Address(req.body)
        await newInfo.save()
        res.status(201).json(newInfo)
        console.log(newInfo)
    }catch(error){
        res.status(500).json({error:"Internal server error"})
    }
})
app.delete("/address/:id",async(req, res)=>{
    const addressId = req.params.id
    try{
        const deleteAddress = await Address.findOneAndUpdate(
                    { "address._id": addressId }, 
                    { $pull: { address: { _id: addressId } } },  
                    { new: true }
                );  
        console.log(deleteAddress)
        if(!deleteAddress){
            return res.status(404).json({message:"Address not found"})
        }
        res.status(200).json({message:"Address deleted successfully", address:deleteAddress})
    }catch(error){
        res.status(500).json({error:"Internal server error"})
    }
})
const PORT = 3000;
app.listen(PORT,()=>{console.log(`Serever is running on Port ${PORT}`)})

