const express = require('express');
const { userValidationRules, roomValidationRules, messageValidationRules, listingValidationRules, validate } = require('../middleware/validator')
const rootRouter = express.Router();
const { adaptor } = require('../adaptor');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const bodyParser = require('body-parser');

rootRouter.use(bodyParser.urlencoded({ extended: false }))

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


//routes--------

rootRouter.post(
    '/user',
    userValidationRules(),
    validate,
    (req, res) => {
        return res.send('verynice');
        //const exist=user.find(email)
        //if(exist) 
    });


    //listing routes
rootRouter.post(
    '/listing',
    listingValidationRules(),
    validate,
    adaptor.createListing);

rootRouter.put(
    '/listing',
    listingValidationRules(),
    validate,
    adaptor.updateListing);

rootRouter.delete(
    '/listing',
    listingValidationRules(),
    validate,
    adaptor.deleteListing);

rootRouter.get(
    '/listing',
    listingValidationRules(),
    validate,
    adaptor.getAllListings);

rootRouter.get(
    '/listing/:listingID',
    adaptor.getListingsById);


    //room routes
rootRouter.get("/room",
    //adaptor.getRoom,
    async (req, res) => {
        const { resources } = await cloudinary.search
            .expression('folder:BPR')
            .sort_by('public_id', 'desc')
            .max_results(30)
            .execute();
        const publicIds = resources.map((file) =>
            file.public_id);
        res.send(publicIds);
    });

rootRouter.post("/room",
    roomValidationRules(),
    validate,
    upload.single('photo'),
    adaptor.assignRoom);

rootRouter.put("/room",
    roomValidationRules(),
    validate,
    upload.single('photo'),
    adaptor.updateRoom);

rootRouter.delete("/room",
    roomValidationRules(),
    validate,
    adaptor.deleteRoom);

rootRouter.get("/room/:roomID",
    adaptor.getRoom);

rootRouter.put("/room/:roomID",
    adaptor.updatePanel);

rootRouter.put("/room/:roomID",
    adaptor.deletePanel);

//user routes
rootRouter.post('/user/login',
    adaptor.loginUser);

rootRouter.post('/user/create',  
    userValidationRules(),
    validate,
adaptor.createUser);

rootRouter.put('/user/:userID',  
    userValidationRules(),
    validate,
adaptor.updateUser);

rootRouter.delete('/user/:userID',  
    //authorisation
    adaptor.deleteUser
    //error middleware
);

rootRouter.post(
    '/message/:agentName',
    messageValidationRules(),
    validate,
    adaptor.addMessage
);

rootRouter.get(
    '/message/:userID',
    adaptor.getMessages
);

module.exports = rootRouter;