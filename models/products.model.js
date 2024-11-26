const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title:String,
    description :String,
    category : String,
    rating: Number,
    price:Number,
    imageUrl:String,
    isWishlist:Boolean,
    isCart:Boolean,
})

const Products = mongoose.model("Products",productSchema)
module.exports = {Products}