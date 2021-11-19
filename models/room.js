const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const roomSchema=new Schema({
description:{
    type:String,
    required:true
},
size:{
    type:float,
    required:true
},
photo:{
    type:String,
    required:true
},
infoPanel:{
    title:{
        type:String,
        required:true
    },
    text:{
        type:String,
        required:true
    }
}
},{timestamps:true});

const Room=mongoose.model('room',roomSchema);
module.exports=Room;

