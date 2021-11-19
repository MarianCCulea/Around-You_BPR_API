const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    profile_image:{
        type:String
    },
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true
    },
    phone:{
        type:String,
        required:true
    },
    sex:{
        type:String,
        required:true
    },
    is_superuser:{
        type:Boolean,
        required:true
    },
    is_agent:{
        type:Boolean,
        required:true
    },
    is_active:{
        type:Boolean,
        required:true
    }
    
},{timestamps:true})


const User=mongoose.model('user',userSchema);

module.exports=User;