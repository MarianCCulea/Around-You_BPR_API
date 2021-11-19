const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const listingSchema=new Schema({
title: {
    type:String,
    required:true
},
descrpition:{
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
    type:String,
    required:true
},
street:{
    type:String,
    required:true
},
house_no:{
    type:String,
    required:true
},
door_no:{

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
    required:true
},
room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "room"
  }

},{timestamps:true});

const Listing=mongoose.model('listing',listingSchema);
module.exports=Listing;

