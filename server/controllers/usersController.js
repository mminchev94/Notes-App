const User = require("../models/user");

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.create({ email, password });
    res.json({ user });
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
};

module.exports = { signup };
