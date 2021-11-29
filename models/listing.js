const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const listingSchema=new Schema({
title: {
    type:String,
    required:true
},
description:{
    type:String,
    required:true
},
floor:{
    type:String,
    required:true
},
floor_no:{
    type:String,
    required:true
},
price:{
    type: mongoose.Decimal128,
    required:true
},
street:{
    type:String,
    required:true
},
house_no:{
    type:String,
    required:false
},
door_no:{
    type:String,
    required:false
},
city:{
    type:String,
    required:true
},
postal_code:{
    type:String,
    required:true
},
is_active:{
    type:Boolean,
    required:true,
    default:true
},
room: [{
    type: mongoose.Schema.Types.ObjectId,
    required:false,
    ref: "room"
  }]

},{timestamps:true});

const Listing=mongoose.model('listing',listingSchema);
module.exports=Listing;

