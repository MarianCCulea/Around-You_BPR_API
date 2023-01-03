const { messageController } = require("../controllers");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = {
  //message routes
  async addMessage(req, res, next) {
    try {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      if (token == null) return res.sendStatus(401);
      jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        async (err, payload) => {
          req.body["sender_ID"] = payload.sub;
        }
      );
      const msg = await messageController.createMessage(
        req.params.agentID,
        req.body
      );
      res.send(msg);
    } catch (err) {
      res.send(err.body);
    }
  },
  async getMessages(req, res, next) {
    try {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      if (token == null) return res.sendStatus(401);
      jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        async (err, payload) => {
          if (payload.sub == req.params.agentID) {
            const msg = await messageController.getAllMessages(
              req.params.agentID
            );
            res.send(msg);
          } else {
            res.sendStatus(401).send("Not authorized");
          }
        }
      );
    } catch (err) {
      res.send(err.body);
    }
  },
};
