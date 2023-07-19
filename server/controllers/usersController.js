const User = require("../models/user");
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 8);

    const user = await User.create({ email, password: hashedPassword });
    res.json({ user });
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
};

module.exports = { signup };
