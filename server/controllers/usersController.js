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

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.sendStatus(401);

    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) return res.sendStatus(401);

    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
};

const logout = (req, res) => {};

module.exports = { signup, login, logout };
