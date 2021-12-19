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

const {authorize,authorizeRequest} = require('../auth/auth.js');
const Role = require('../auth/role.js');
const bodyParser = require('body-parser');

const jwt = require('jsonwebtoken');

rootRouter.use(bodyParser.urlencoded({ extended: true }))

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
const upload = multer({ storage: storage, limits: { fileSize: 51100000 } });

//routes--------

//listing routes

rootRouter.post(
    '/test', authorize([Role.Admin, Role.Agent]),
    upload.single('thumbnail'),
    listingValidationRules(),
    validate, (req, res) => {
        console.log(req.body);
        res.send(req.body);
    });

    rootRouter.get(
        '/authorize',
authorizeRequest
        );

rootRouter.post(
    '/listing',
    authorize([Role.Admin, Role.Agent]),
    upload.single('thumbnail'),
    listingValidationRules(),
    validate,
    adaptor.createListing);

rootRouter.post(
    '/listing/:listingID',
    authorize([Role.Admin, Role.Agent]),
    upload.single('thumbnail'),
    listingValidationRules(),
    validate,
    adaptor.uploadListingPhoto);

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
    '/listing:page',
    adaptor.getLimitedListings);

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

rootRouter.post("/room/:listingID",
    authorize([Role.Admin, Role.Agent]),
    upload.single('image'),
    roomValidationRules(),
    validate,
    adaptor.assignRoom);

rootRouter.put("/room",
    authorize([Role.Admin, Role.Agent]),
    upload.single('photo'),
    roomValidationRules(),
    validate,
    adaptor.updateRoom);

rootRouter.delete("/room",
    authorize([Role.Admin, Role.Agent]),
    roomValidationRules(),
    validate,
    adaptor.deleteRoom);

rootRouter.get("/room/:roomID",
    authorize(),
    adaptor.getRoom);

rootRouter.get("/room/listing/:listingID",
    //authorize(),
    adaptor.getRooms);

//user routes
rootRouter.post('/user/login',
    loginValidationRules(),
    validate,
    adaptor.loginUser);

rootRouter.get('/user/:userID',
    adaptor.getPublicUser);

rootRouter.post('/user/create',
   upload.single('profile_image'),
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
    '/message/:agentID',
    authorize([Role.User, Role.Admin]),
    messageValidationRules(),
    validate,
    adaptor.addMessage);

rootRouter.get(
    '/message/:agentID',
    authorize(Role.Agent),
    adaptor.getMessages);

//ADMIN routes

rootRouter.post('/admin/user',
    authorize(Role.Admin),
    upload.single('profile_image'),
    adminValidationRules(),
    validate,
    adaptor.createUser);

rootRouter.put('/admin/user',
    authorize([Role.Admin]),
    userUpdateAdminValidationRules(),
    validate,
    adaptor.updateUser);

module.exports = rootRouter;