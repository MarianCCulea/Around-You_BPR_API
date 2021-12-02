const mongoose= require('mongoose');

const express=require('express');
const rootRouter = require('./routes/index');

const app=express();
app.use(express.json());
app.use(rootRouter);

const dbURI='mongodb+srv://user1:123abc@bpr.tahew.mongodb.net/BPR_Atlas?retryWrites=true&w=majority'
mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true})
.then((result)=>app.listen(3000))
.catch((err)=>console.log(err));