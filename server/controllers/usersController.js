const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 8);

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

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.sendStatus(401);

    const token = jwt.sign({ userID: user._id }, process.env.SECRET, { expiresIn: "30d" });

    res.cookie("Authorization", token, {
      httpOnly: true,
      sameSite: "lax",
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
};

const logout = (req, res) => {};

module.exports = { signup, login, logout };
