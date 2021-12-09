const express = require('express');
const { userValidationRules, roomValidationRules,
    messageValidationRules, listingValidationRules,
    loginValidationRules, adminValidationRules, userUpdateValidationRules,
    userUpdateAdminValidationRules,
    validate } = require('../middleware/validator')
const rootRouter = express.Router();
const { adaptor } = require('../adaptor');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const authorize = require('../auth/auth.js');
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

rootRouter.put(
    '/test', (req, res) => {
        console.log(req);
        res.send(req.body);
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
    '/listing/:listingID',
    authorize([Role.Admin, Role.Agent]),
    adaptor.deleteListing);

rootRouter.get(
    '/listing',
    adaptor.getAllListings);

rootRouter.get(
    '/listing/:listingID',
    adaptor.getListingsById);


//room routes
////???????????
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
    authorize(Role.User),
    adaptor.getRoom);

    rootRouter.get("/room/listing/:listingID",
    authorize(Role.User),
    adaptor.getRoom);

//user routes
rootRouter.post('/user/login',

    loginValidationRules(),
    validate,
    upload.single('profile_image'),
    adaptor.loginUser);

rootRouter.post('/user/create',
    userValidationRules(),
    validate,
    adaptor.createUser);

rootRouter.put('/user',
    authorize(),
    userUpdateValidationRules(),
    validate,
    adaptor.updateUser);

rootRouter.delete('/user/:userID',
    authorize(),
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

//ADMIN routes

rootRouter.post('/admin/user',
    authorize(Role.Admin),
    adminValidationRules(),
    validate,
    adaptor.createUser);

rootRouter.put('/admin/user',
    authorize([Role.Admin]),
    userUpdateAdminValidationRules(),
    validate,
    adaptor.updateUser);

module.exports = rootRouter;