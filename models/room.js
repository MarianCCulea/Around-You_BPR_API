const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const roomSchema=new Schema({
    infoPanel:{
    type:String,
    required:true
},
photo:{
    type:String,
    required:true
}
},{timestamps:true});

const Room=mongoose.model('room',roomSchema);
module.exports=Room;

