const jwt = require("jsonwebtoken");
const config = require("../config/config");

module.exports =
  (roles = []) =>
  (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, config.jwt.secret);
      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Forbidden" });
      }

      next();
    } catch (error) {
      res.status(401).json({ message: "Unauthorized" });
    }
  };
