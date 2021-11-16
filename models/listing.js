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
}

},{timestamps:true});

const Listing=mongoose.model('Listing',listingSchema);
module.exports=Listing;

