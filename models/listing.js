const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const pointSchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  });

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
location: {
    type: pointSchema,
    required: true
  },
postal_code:{
    type:Number,
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
ground_size:{
    type:Number,
    required:true
},
energy_level:{
    type:String,
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
trafficScore:{
    type:Number,
    required:false,default:0
},
room: [{
    type: mongoose.Schema.Types.ObjectId,
    required:false,
    ref: "room"
  }]

},{timestamps:true});

const Listing=mongoose.model('listing',listingSchema);
module.exports=Listing;

