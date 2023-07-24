if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const database = require("./config/database");
const notesController = require("./controllers/notesController");
const usersController = require("./controllers/usersController");
const cookieParser = require("cookie-parser");

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

database();

app.post("/signup", usersController.signup);
app.post("/login", usersController.login);
app.get("/logout", usersController.logout);

app.post("/notes", notesController.createNote);
app.get("/notes", notesController.fetchNotes);
app.get("/notes/:id", notesController.fetchNote);
app.put("/notes/:id", notesController.updateNote);
app.delete("/notes/:id", notesController.deleteNote);

app.listen(port, () => console.log(`Server is running on port ${port}`));
