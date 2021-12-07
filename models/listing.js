const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const listingSchema=new Schema({
title: {
    type:String,
    required:true
},
street:{
    type:String,
    required:true
},
city:{
    type:String,
    required:true
},
house_no:{
    type:String,
    required:true
},
postal_code:{
    type: String,
    required:true
},
year_of_construction:{
    type:Number,
    required:true
},
living_space:{
    type:Number,
    required:false
},
no_of_floors:{
    type:Number,
    required:false
},
price:{
    type:Number,
    required:false
},
groud_size:{
    type:Number,
    required:true
},
enerhy_level:{
    type:Number,
    required:true
},
thumbnail:{
    type:String,
    required:true
},
description:{
    type:String,
    required:true
},
property_type:{
    type: String,
    enum: [ "Appartment", "House" ],
    required:true
},
is_active:{
    type:Boolean,
    required:false,
    default:true
},
measure_time_on_market:{
    type:String,
    required:false,
},
agentID:{
    type:String,
    required:true,
},
room: [{
    type: mongoose.Schema.Types.ObjectId,
    required:false,
    ref: "room"
  }]

},{timestamps:true});

const Listing=mongoose.model('listing',listingSchema);
module.exports=Listing;

