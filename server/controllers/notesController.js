const Note = require("../models/note");

const createNote = async (req, res) => {
  try {
    const { title, body } = req.body;
    const note = await Note.create({ title, body });

    res.json({ note });
  } catch (e) {
    console.log(e);
  }
};

const fetchNotes = async (req, res) => {
  try {
    const notes = await Note.find();

    res.json({ notes });
  } catch (e) {
    console.log(e);
  }
};

module.exports = { createNote, fetchNotes };
