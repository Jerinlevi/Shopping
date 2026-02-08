const User = require("../models/User");

module.exports = async (req, res, next) => {

  const token = req.headers.authorization.split(' ')[1];

  if (!token) return res.status(401).json("No token");

  const user = await User.findOne({ token });

  if (!user) return res.status(401).json("Unauthorized");

  req.user = user;

  next();
};