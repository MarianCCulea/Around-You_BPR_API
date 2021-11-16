
const mongoose= require('mongoose');
const express=require('express');

//express app
const app=express();

//listen for request
app.listen(3000);

app.get('/',(req,res)=>{
    res.send('<p>home Page</p>');

});


// const Listing=require('./models/listing')
// //connect to mongodb
// const dbURI='mongodb+srv://user1:123abc@bpr.tahew.mongodb.net/BPR_Atlas?retryWrites=true&w=majority'
// mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true})
// .then((result)=>app.listen(3000))
// .catch((err)=>console.log(err));

// app.get('/add-listing',(req,res)=>{
//     const listing= new Listing({
//         title:'new list',
//         descrpition:'descrrrp'
//     });

//     blog.save()
//     .then((result)=>{res.send(result)})
//     .catch((err)=>{console.log(err);
//     });
// })


// app.get('/all-listings',(req,res)=>{
//     Blog.find()
//     .then((result)=>{
//         res.send(result);
//     })
//     .catch((err)=>{
//         console.log(err);
//     });
// })


// app.get('/single-listing',(req,res)=>{
//     Blog.findById('idddd')
//      .then((result)=>{
//         res.send(result);
//     })
//     .catch((err)=>{
//         console.log(err);
//     });
// })

