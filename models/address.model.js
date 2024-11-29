const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
firstName:String,
lastName:String,
phoneNumber: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'],
  },
email:String,
address:[{
address:{
    type:String,
    require:true
},
state:{
    type:String,
    require:true
},
city:{
type: String,
require:true
},
zipCode:{
type:String,
require:true
}
}],
author:{type:mongoose.Schema.Types.ObjectId,ref:"Products"},
},{timestamps:true})

const Address = mongoose.model("Address",addressSchema)
module.exports = {Address};