const mongoose= require('mongoose');
//const db= require('./models');
//express app
//connect to mongodb


const express=require('express');
const rootRouter = require('./routes/index');

const app=express();
app.use(express.json());
app.use(rootRouter);

//listen for request
// const port = process.env.PORT || 3000;
// app.listen(port, () => console.log( 'Listening on port ${port}...' ));

const dbURI='mongodb+srv://user1:123abc@bpr.tahew.mongodb.net/BPR_Atlas?retryWrites=true&w=majority'
mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true})
.then((result)=>app.listen(3000))
.catch((err)=>console.log(err));