const { userController } = require("../controllers");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = {
  //user routes
  async loginUser(req, res, next) {
    try {
      var userAccount = await userController.getUserByQuery({
        username: req.body.username,
      });
      if (!userAccount) return res.sendStatus(401);
      if (!userAccount.is_active) res.send("Account is inactive");
      const validPass = await bcrypt.compare(
        req.body.password,
        userAccount.password
      );
      if (validPass) {
        //if is active!!!~
        const token = jwt.sign(
          { sub: userAccount._id, role: userAccount.role },
          process.env.ACCESS_TOKEN_SECRET
        );
        delete userAccount.password;
        userAccount.token = token;
        res.send(userAccount);
      } else {
        res.sendStatus(401);
      }
    } catch (err) {
      console.error(err);
    }
  },
  async createUser(req, res, next) {
    try {
      var userAccount = await userController.getUserByQuery({
        username: req.body.username,
      });
      if (userAccount == null) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        req.body.profile_image = req.file.path;
        const acc = await userController.createUser(req.body);
        res.send(acc);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      res.sendStatus(402);
    }
  },
  async createAgent(req, res, next) {
    try {
      var userAccount = await userController.getUserByQuery({
        username: req.body.username,
      });
      if (userAccount == null) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        req.body.profile_image = req.file.path;
        req.body["role"] = "Agent";
        const acc = await userController.createUser(req.body);
        res.send(acc);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      res.sendStatus(402);
      next();
    }
  },
  async updateUser(req, res, next) {
    try {
      const userAccount = await userController.getUserById(req.body._id);
      if (!userAccount.is_active) res.send("Account is inactive");
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      if (token == null) return res.sendStatus(401);
      jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        async (err, payload) => {
          if (payload.sub == userAccount._id) {
            const newUser = await userController.updateUser(req.body);
            res.send(newUser);
          } else res.send("Error");
        }
      );
    } catch (err) {
      res.send(err.body);
    }
  },
  async getUserById(req, res, next) {
    try {
      const user = await userController.getUserById(req.params.userID);
      res.send(user);
    } catch (err) {
      res.send(err.body);
    }
  },
  async getPublicUser(req, res, next) {
    try {
      const user = await userController.getUserById(req.params.userID);
      delete user.password;
      res.send(user);
    } catch (err) {
      res.send(err.body);
    }
  },
  async deleteUser(req, res, next) {
    try {
      const userAccount = await userController.getUserById(req.params.userID);
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      if (token == null) return res.sendStatus(401);
      jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        async (err, payload) => {
          if (payload.sub == userAccount._id) {
            await userController.deleteUser(req.params.userID);
            res.sendStatus(200);
          } else res.send("Error");
        }
      );
    } catch (err) {
      res.send(err.body);
    }
  },
};
