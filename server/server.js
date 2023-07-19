const express = require("express");
const cors = require("cors");
const database = require("./config/database");
const notesController = require("./controllers/notesController");
const usersController = require("./controllers/usersController");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());

database();

app.post("/signup", usersController.signup);

app.post("/notes", notesController.createNote);
app.get("/notes", notesController.fetchNotes);
app.get("/notes/:id", notesController.fetchNote);
app.put("/notes/:id", notesController.updateNote);
app.delete("/notes/:id", notesController.deleteNote);

app.listen(port, () => console.log(`Server is running on port ${port}`));
