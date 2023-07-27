if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const notesController = require("./controllers/notesController");
const usersController = require("./controllers/usersController");
const auth = require("./middleware/auth");

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(cookieParser());

database();

app.post("/signup", usersController.signup);
app.post("/login", usersController.login);
app.post("/logout", usersController.logout);
app.get("/auth", auth, usersController.auth);

app.post("/notes", auth, notesController.createNote);
app.get("/notes", auth, notesController.fetchNotes);
app.get("/notes/:id", auth, notesController.fetchNote);
app.put("/notes/:id", auth, notesController.updateNote);
app.delete("/notes/:id", auth, notesController.deleteNote);

app.listen(port, () => console.log(`Server is running on port ${port}`));
