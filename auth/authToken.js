require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = {
  //listing methods
  async createToken(username) {
    try {
      const accessToken = jwt.sign(username, process.env.ACCESS_TOKEN_SECRET);
      res.json({ accessToken: accessToken });
    } catch (err) {
      next(err);
      console.error(err);
    }
  },
  async authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  },
};
