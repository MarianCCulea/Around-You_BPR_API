const mongoose=require('mongoose');
const validator = require('validator');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        validate: [validator.isAlphanumeric, 'Username may only have letters and numbers.']
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
        required:false,
        default:false
    },
    is_agent:{
        type:Boolean,
        required:false,
        default:false
    },
    is_active:{
        type:Boolean,
        required:false,
        default:true
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        required:false,
        ref: "message"
      }]
},{timestamps:true})

const User=mongoose.model('user',userSchema);

module.exports=User;