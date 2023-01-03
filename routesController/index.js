const express = require("express");
const {
  userValidationRules,
  roomValidationRules,
  messageValidationRules,
  listingValidationRules,
  loginValidationRules,
  adminValidationRules,
  userUpdateValidationRules,
  searchValidationRules,
  userUpdateAdminValidationRules,
  validate,
} = require("../middleware/validator");
const rootRouter = express.Router();
const {
  adaptorListing,
  adaptorMessage,
  adaptorRoom,
  adaptorUser,
} = require("../adaptor");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const { authorize, authorizeRequest } = require("../auth/auth.js");
const Role = require("../auth/role.js");
const bodyParser = require("body-parser");

const jwt = require("jsonwebtoken");

const NodeGeocoder = require("node-geocoder");

rootRouter.use(bodyParser.urlencoded({ extended: true }));

//cloudinary config
cloudinary.config({
  cloud_name: "bprp3bjer",
  api_key: "474633613652241",
  api_secret: "o-tRfks9mQiKz3pAMrZeXkuwUpI",
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
  "/test",
  // authorize([Role.Admin, Role.Agent]),
  //upload.single('thumbnail'),
  (req, res) => {
    console.log(req.body);
    res.send(req.body);
  }
);

rootRouter.post("/myRoute", async function (req, res, next) {
  const options = {
    provider: "mapquest",

    // Optional depending on the providers
    apiKey: "JS7J6ydOXEOdUCdR5nZA3sH0Gda6JlmO", // for Mapquest, OpenCage, Google Premier
    formatter: null, // 'gpx', 'string', ...
  };

  const geocoder = NodeGeocoder(options);

  // Using callback
  const ress = await geocoder.geocode(req.body.location);

  res.send(ress);
});

rootRouter.get("/authorize", authorizeRequest);

rootRouter.post(
  "/listing",
  authorize([Role.Admin, Role.Agent]),
  upload.single("thumbnail"),
  listingValidationRules(),
  validate,
  adaptorListing.createListing
);

rootRouter.post(
  "/listing/:listingID",
  authorize([Role.Admin, Role.Agent]),
  upload.single("thumbnail"),
  listingValidationRules(),
  validate,
  adaptorListing.uploadListingPhoto
);

rootRouter.post("/listingsearch", adaptorListing.listingSearch);

rootRouter.post("/listingtraffic", adaptorListing.incrementTraffic);

rootRouter.put(
  "/listing",
  authorize([Role.Admin, Role.Agent]),
  listingValidationRules(),
  validate,
  adaptorListing.updateListing
);

rootRouter.delete(
  "/listing/:listingID",
  authorize([Role.Admin, Role.Agent]),
  adaptorListing.deleteListing
);

rootRouter.get(
  "/listing/:page/:itemPerPage",
  adaptorListing.getLimitedListings
);

rootRouter.get("/listing/:listingID", adaptorListing.getListingsById);

//room routes
////???????????
rootRouter.get(
  "/room",
  //adaptor.getRoom,
  async (req, res) => {
    const { resources } = await cloudinary.search
      .expression("folder:BPR")
      .sort_by("public_id", "desc")
      .max_results(30)
      .execute();
    const publicIds = resources.map((file) => file.public_id);
    res.send(publicIds);
  }
);

rootRouter.post(
  "/room/:listingID",
  authorize([Role.Admin, Role.Agent]),
  upload.single("image"),
  roomValidationRules(),
  validate,
  adaptorRoom.assignRoom
);

rootRouter.put(
  "/room",
  authorize([Role.Admin, Role.Agent]),
  upload.single("photo"),
  roomValidationRules(),
  validate,
  adaptorRoom.updateRoom
);

rootRouter.delete(
  "/room",
  authorize([Role.Admin, Role.Agent]),
  roomValidationRules(),
  validate,
  adaptorRoom.deleteRoom
);

rootRouter.get("/room/:roomID", authorize(), adaptorRoom.getRoom);

rootRouter.get(
  "/room/listing/:listingID",
  //authorize(),
  adaptorRoom.getRooms
);

//user routes
rootRouter.post(
  "/user/login",
  loginValidationRules(),
  validate,
  adaptorUser.loginUser
);

rootRouter.get("/user/:userID", adaptorUser.getPublicUser);

rootRouter.post(
  "/user/create",
  upload.single("profile_image"),
  userValidationRules(),
  validate,
  adaptorUser.createUser
);

rootRouter.put(
  "/user",
  authorize(),
  userUpdateValidationRules(),
  validate,
  adaptorUser.updateUser
);

rootRouter.delete(
  "/user/:userID",
  authorize(),
  adaptorUser.deleteUser
  //error middleware
);

rootRouter.post(
  "/message/:agentID",
  authorize([Role.User, Role.Admin]),
  messageValidationRules(),
  validate,
  adaptorMessage.addMessage
);

rootRouter.get(
  "/message/:agentID",
  authorize(Role.Agent),
  adaptorMessage.getMessages
);

//ADMIN routes

rootRouter.post(
  "/admin/user",
  authorize(Role.Admin),
  upload.single("profile_image"),
  adminValidationRules(),
  validate,
  adaptorUser.createAgent
);

rootRouter.put(
  "/admin/user",
  authorize([Role.Admin]),
  userUpdateAdminValidationRules(),
  validate,
  adaptorUser.updateUser
);

module.exports = rootRouter;
