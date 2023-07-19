const express = require("express");
const cors = require("cors");
const database = require("./config/database");
const notesController = require("./controllers/notesController");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());

database();

app.post("/notes", notesController.createNote);

app.listen(port, () => console.log(`Server is running on port ${port}`));
