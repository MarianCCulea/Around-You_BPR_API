const { listingController, roomController } = require("../controllers");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = {
  //room methods
  async assignRoom(req, res, next) {
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
            req.body.photo = req.file.path;
            await roomController.assignRoom(req.body.listingID, req.body);
            res.send(
              await listingController.getListingsById(req.body.listingID)
            );
          } else res.send("Not authorized to update this listing");
        }
      );
    } catch (err) {
      next(err);
      console.error(err);
    }
  },
  async updateRoom(req, res, next) {
    try {
      const listing = await listingController.getListingsByRoomID(
        req.body.roomID
      );
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      if (token == null) return res.sendStatus(401);
      jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        async (err, payload) => {
          if (payload.sub == listing.agentID) {
            const newRoom = await roomController.updateRoom(
              req.body._id,
              req.body
            );
            res.send(newRoom);
          } else res.send("Not authorized to update this listing");
        }
      );
    } catch (err) {
      next(err);
      console.error(err);
    }
  },
  async deleteRoom(req, res, next) {
    try {
      res.send(roomController.deleteRoom(req.body.roomID, req.body));
    } catch (err) {
      next(err);
      console.error(err);
    }
  },
  async getRoom(req, res, next) {
    try {
      res.send(await roomController.getRoom(req.params.roomID));
    } catch (err) {
      next(err);
      console.error(err);
    }
  },
  async getRooms(req, res, next) {
    try {
      const listing = await listingController.getListingsById(
        req.params.listingID
      );
      res.send(listing.room);
    } catch (err) {
      next(err);
      console.error(err);
    }
  },
};
