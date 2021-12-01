const express = require('express');
const { userValidationRules, roomValidationRules, messageValidationRules, listingValidationRules, validate } = require('../middleware/validator')
const rootRouter=express.Router();
const {adaptor}=require('../adaptor');
const multer=require('multer');
const cloudinary=require('cloudinary').v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// const cpUpload = upload.fields([{ name: 'photo', maxCount: 5 }])

//cloudinary config
cloudinary.config({ 
    cloud_name: 'bprp3bjer', 
    api_key: '474633613652241', 
    api_secret: 'o-tRfks9mQiKz3pAMrZeXkuwUpI' 
  });

//multer storage setup
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "BPR",
    },
  });

    //multer cloudinary setup
const upload = multer({ storage: storage });

const muieupload=upload.fields([{name:'room[photo]',maxCount:7}, {name:'nominee'}]);

//idkkkkkkkk
//upload.array('photo', 7)
rootRouter.post("/uploadd", upload.single('room[photo]'),
 async (req, res) => {
     const muie="ASDASD";
//return res.send(req.body);
    return res.json({ picture: "req.file.path", muie:req.body });
  });

rootRouter.post(
    '/uploamulter-storage-cloudinarydFiles',
    //upload.single('photo'),
   // adaptor.uploadFiles,
(req,res)=>{
console.log(req.body);
    return res.send(req.body);
        //const exist=user.find(email)
        //if(exist) 
});

rootRouter.post(
    '/user',
    userValidationRules(),
    validate,
(req,res)=>{
    return res.send('verynice');
        //const exist=user.find(email)
        //if(exist) 
});

rootRouter.post(
    '/room',
    roomValidationRules(),
    validate,
(req,res)=>{
    return res.send('verynice');
        //const exist=user.find(email)
        //if(exist) 
});

rootRouter.post(
    '/message',
    messageValidationRules(),
    validate,
(req,res)=>{
    return res.send('verynice');
        //const exist=user.find(email)
        //if(exist) 
});

rootRouter.post(
    '/listing',
    listingValidationRules(),
    validate,
    adaptor.createListing,
(req,res)=>{
    
     return res.send("muieee");

        //const exist=user.find(email)
        //if(exist) 
});


rootRouter.post(
    '/getlisting',
    adaptor.getListingsById,
(req,res)=>{
    
     return res.send("muieee");

        //const exist=user.find(email)
        //if(exist) 
});
module.exports=rootRouter;
