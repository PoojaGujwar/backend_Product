const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
firstName:String,
lastName:String,
phoneNumber: Number,
gmail:String,
address1:String,
address2:String,
city:String,
street:String,
zipCode:Number,
author:{type:mongoose.Schema.Types.ObjectId,ref:"Products"},
})

const Address = mongoose.model("Address",addressSchema)
module.exports = {Address};