const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const roomSchema=new Schema({
description:{
    type:String,
    required:true
},
size:{
    type:mongoose.Decimal128,
    required:true
},
photo:{
    type:String,
    required:true
},
infoPanel:{
    title:{
        type:String,
        required:false
    },
    text:{
        type:String,
        required:false
    }
}
},{timestamps:true});

const Room=mongoose.model('room',roomSchema);
module.exports=Room;

