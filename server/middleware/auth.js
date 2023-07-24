const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.Authorization;

    const decoded = jwt.verify(token, process.env.SECRET);

    const user = await User.findById(decoded.userID);
    if (!user) return res.sendStatus(401);

    req.user = user;

    next();
  } catch (e) {
    return res.sendStatus(401);
  }
};

module.exports = auth;
