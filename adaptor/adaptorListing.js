const { listingController } = require("../controllers");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const geocoder = require("../utils/geocoder");

module.exports = {
  //listing methods
  async createListing(req, res, next) {
    try {
      var code =
        req.body.street + " " + req.body.house_no + ", " + req.body.city;
      console.log(code);
      const loc = await geocoder.geocode(code);
      const location = {
        type: "Point",
        coordinates: [loc[0].longitude, loc[0].latitude],
      };
      req.body["location"] = location;

      req.body.thumbnail = req.file.path;
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      if (token == null) return res.sendStatus(401);
      jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        async (err, payload) => {
          req.body["agentID"] = payload.sub;
        }
      );
      delete req.body.room;
      const oldListing = await listingController.createListing(req.body);
      res.send(await listingController.getListingsById(oldListing._id));
    } catch (err) {
      next(err);
      console.error(err);
    }
  },
  async updateListing(req, res, next) {
    try {
      const listing = await listingController.getListingsById(req.body._id);
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      if (token == null) return res.sendStatus(401);
      jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        async (err, payload) => {
          if (payload.sub == listing.agentID) {
            res.send(await listingController.updateListing(req.body));
          } else res.send("Not authorized to update this listing");
        }
      );
    } catch (err) {
      res.send(err);
    }
  },
  async uploadListingPhoto(req, res, next) {
    try {
      const listing = await listingController.getListingsById(
        req.params.listingID
      );
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      if (token == null) return res.sendStatus(401);
      jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        async (err, payload) => {
          if (payload.sub == listing.agentID) {
            res.send(
              await listingController.updateListing({
                thumbnail: req.file.path,
              })
            );
          } else res.send("Not authorized to update this listing");
        }
      );
    } catch (err) {
      res.send(err);
    }
  },
  async deleteListing(req, res, next) {
    try {
      const query = { is_active: false };
      await listingController.updateListing(req.params.listingID, query);
    } catch (err) {
      next(err);
    }
  },
  async getAllListings(req, res, next) {
    try {
      res.send(await listingController.getAllListings());
    } catch (err) {
      next(err);
    }
  },
  async getLimitedListings(req, res, next) {
    try {
      let listings = await listingController.getLimitedListings(
        parseInt(req.params.page, 10),
        parseInt(req.params.itemPerPage, 10)
      );
      res.send(listings);
      // listingController.updateTraffic(listings,1);
    } catch (err) {
      next(err);
    }
  },
  async getListingsById(req, res, next) {
    try {
      res.send(await listingController.getListingsById(req.params.listingID));
    } catch (err) {
      next(err);
    }
  },
  async listingSearch(req, res, next) {
    try {
      let priceQuery = {};
      let propertySizeQuery = {};
      let groundSizeQuery = {};
      let yearQuery = {};
      let typeQuery = {};
      let postalQuery = {};
      if (
        req.body.hasOwnProperty("minPrice") &&
        req.body.hasOwnProperty("maxPrice")
      ) {
        priceQuery = {
          $and: [
            { price: { $gte: req.body.minPrice } },
            { price: { $lte: req.body.maxPrice } },
          ],
        };
      }

      if (req.body.hasOwnProperty("living_space")) {
        propertySizeQuery = {
          $and: [
            {
              living_space: {
                $gte: req.body.living_space - req.body.living_space * 0.45,
              },
            },
            {
              living_space: {
                $lte: req.body.living_space + req.body.living_space * 0.45,
              },
            },
          ],
        };
      }

      if (req.body.hasOwnProperty("ground_size")) {
        groundSizeQuery = {
          $and: [
            {
              ground_size: {
                $gte: req.body.ground_size - req.body.ground_size * 0.4,
              },
            },
            {
              ground_size: {
                $lte: req.body.ground_size + req.body.ground_size * 0.4,
              },
            },
          ],
        };
      }

      if (req.body.hasOwnProperty("year_of_construction")) {
        yearQuery = {
          $and: [
            {
              year_of_construction: {
                $gte: req.body.year_of_construction - 20,
              },
            },
            {
              year_of_construction: {
                $lte: req.body.year_of_construction + 20,
              },
            },
          ],
        };
      }

      if (req.body.hasOwnProperty("property_type")) {
        typeQuery = { property_type: req.body.property_type };
      }

      if (req.body.hasOwnProperty("postal_code")) {
        postalQuery = {
          $and: [
            {
              postal_code: {
                $gte: req.body.postal_code - req.body.postal_code * 0.2,
              },
            },
            {
              postal_code: {
                $lte: req.body.postal_code + req.body.postal_code * 0.2,
              },
            },
          ],
        };
      }

      let query = {
        $and: [
          priceQuery,
          propertySizeQuery,
          groundSizeQuery,
          yearQuery,
          typeQuery,
          postalQuery,
        ],
      };
      let listings = await listingController.getListingsByQuery(query);
      res.send(listings);
      listingController.updateTraffic(listings, 1);
    } catch (err) {
      next(err);
    }
  },
  async getListingsById(req, res, next) {
    try {
      res.send(await listingController.getListingsById(req.params.listingID));
    } catch (err) {
      next(err);
    }
  },
  async incrementTraffic(req, res, next) {
    try {
      await listingController.updateTrafficSingular(req.body.listingID, 3);
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  },
};
