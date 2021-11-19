const mongoose=require('mongoose');
const validator = require('validator');
const Schema=mongoose.Schema;

const messageSchema=new Schema({
title:{
    type: String,
    required: [true, 'Username does not exist.'],
    lowercase: true,
    validate: [validator.isAlphanumeric, 'Usernames may only have letters and numbers.']
},
content:{
    type:String,
    required:true
},
sender_ID:{
    type:String,
    required:true
}
},{timestamps:true});

const Message=mongoose.model('message',messageSchema);
module.exports=Message;