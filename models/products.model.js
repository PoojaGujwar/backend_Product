const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:String,
    title:String,
    description :String,
    color:String,
    size:String,
    category : String,
    rating: Number,
    price:Number,
    imageUrl:String,
    likes:{
        type:Number,
        default:0
    },
    isWishlist:{
        type:Boolean,
        default:false
    },
    isCart:{
     type:Boolean,
     default:false   
    },
    quantity:{
        type:Number,
        default:0
    }
})

const Products = mongoose.model("Products",productSchema)
module.exports = {Products}