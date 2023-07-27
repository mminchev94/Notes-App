const Note = require("../models/note");

const createNote = async (req, res) => {
  try {
    const { title, body } = req.body;
    const note = await Note.create({ title, body, user: req.user._id });

    res.json({ note });
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
};

const fetchNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id });

    res.json({ notes });
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
};

const fetchNote = async (req, res) => {
  try {
    const id = req.params.id;

    const note = await Note.findOne({ _id: id, user: req.user._id });
    res.json({ note });
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
};

const updateNote = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, body } = req.body;

    await Note.findOneAndUpdate({ _id: id, user: req.user._id }, { title, body });

    const note = await Note.findById(id);
    res.json({ note });
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
};

const deleteNote = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedNote = await Note.deleteOne({ _id: id, user: req.user._id });
    res.json({ deletedNote });
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
};

module.exports = { createNote, fetchNotes, fetchNote, updateNote, deleteNote };
