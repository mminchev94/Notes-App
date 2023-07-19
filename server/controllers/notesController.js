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

const fetchNote = async (req, res) => {
  try {
    const id = req.params.id;

    const note = await Note.findById(id);
    res.json({ note });
  } catch (e) {
    console.log(e);
  }
};

const updateNote = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, body } = req.body;

    await Note.findByIdAndUpdate(id, { title, body });

    const note = await Note.findById(id);
    res.json({ note });
  } catch (e) {
    console.log(e);
  }
};

const deleteNote = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedNote = await Note.findByIdAndDelete(id);
    res.json({ deletedNote });
  } catch (e) {
    console.log(e);
  }
};

module.exports = { createNote, fetchNotes, fetchNote, updateNote, deleteNote };
