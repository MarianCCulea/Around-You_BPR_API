const express = require('express');
const { userValidationRules, roomValidationRules, messageValidationRules, listingValidationRules, validate } = require('../middleware/validator')
const rootRouter=express.Router();

// app.post('/user/all', function(req, res){
//     Controller.Create
//   });

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
(req,res)=>{
    return res.send('verynice');
        //const exist=user.find(email)
        //if(exist) 
});

module.exports=rootRouter;
