const mongoose = require("mongoose");

const database = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to DB");
  } catch (e) {
    console.log(e);
  }
};

module.exports = database;
