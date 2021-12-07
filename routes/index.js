const express = require('express');
const { userValidationRules, roomValidationRules, 
    messageValidationRules, listingValidationRules, 
    loginValidationRules,agentValidationRules, 
    validate } = require('../middleware/validator')
const rootRouter = express.Router();
const { adaptor } = require('../adaptor');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const authorize = require('../auth/auth');
const Role = require('../auth/role.js');
const bodyParser = require('body-parser');

const jwt = require('jsonwebtoken');

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

//listing routes

rootRouter.get(
    '/test',(req,res)=>{
        res.send(Role.Admin+Role.Agent);
    });


rootRouter.post(
    '/listing',
    authorize([Role.Admin, Role.Agent]),
    listingValidationRules(),
    validate,
    adaptor.createListing);

rootRouter.put(
    '/listing',
    authorize([Role.Admin, Role.Agent]),
    listingValidationRules(),
    validate,
    adaptor.updateListing);

rootRouter.delete(
    '/listing',
    authorize([Role.Admin, Role.Agent]),
    listingValidationRules(),
    validate,
    adaptor.deleteListing);

rootRouter.get(
    '/listing',
    authorize(),
    listingValidationRules(),
    validate,
    adaptor.getAllListings);

rootRouter.get(
    '/listing/:listingID',
    authorize(),
    adaptor.getListingsById);


//room routes
rootRouter.get("/room",
    authorize(),
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
    authorize([Role.Admin, Role.Agent]),
    roomValidationRules(),
    validate,
    upload.single('photo'),
    adaptor.assignRoom);

rootRouter.put("/room",
    authorize([Role.Admin, Role.Agent]),
    roomValidationRules(),
    validate,
    upload.single('photo'),
    adaptor.updateRoom);

rootRouter.delete("/room",
    authorize([Role.Admin, Role.Agent]),
    roomValidationRules(),
    validate,
    adaptor.deleteRoom);

rootRouter.get("/room/:roomID",
    authorize(Role.Uer),
    adaptor.getRoom);

rootRouter.put("/room/:roomID",
    authorize([Role.Admin, Role.Agent]),
    adaptor.updatePanel);

rootRouter.put("/room/:roomID",
    authorize([Role.Admin, Role.Agent]),
    adaptor.deletePanel);

//user routes
rootRouter.post('/user/login',
    loginValidationRules(),
    validate,
    adaptor.loginUser);

rootRouter.post('/user/create',
    userValidationRules(),
    validate,
    adaptor.createUser);

rootRouter.post('/user/createAdmin',
    authorize(Role.Admin),
    adminValidationRules(),
    validate,
    adaptor.createAdmin);

rootRouter.put('/user/:userID',
    authorize([Role.User, Role.Admin]),
    userValidationRules(),
    validate,
    adaptor.updateUser);

rootRouter.delete('/user/:userID',
    authorize([Role.User, Role.Admin]),
    //authorisation
    adaptor.deleteUser
    //error middleware
);

rootRouter.post(
    '/message/:agentName',
    authorize([Role.User, Role.Admin]),
    messageValidationRules(),
    validate,
    adaptor.addMessage);

rootRouter.get(
    '/message/:userID',
    authorize(Role.Agent),
    adaptor.getMessages);


module.exports = rootRouter;