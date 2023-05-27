const express = require('express');
const router = express.Router();
const fetchuser = require("../middleware/fetchuser.js");
const { body, validationResult } = require('express-validator');
const Notes = require("../modals/Notes.js");
const mongoose = require("mongoose");


//Router 1:This router is for fetch all notes login require we send auth token localhost:4000/api/notes/fetchallnotes
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    console.log(mongoose.connection.readyState, "mongoose.connection.readyState")
    if (mongoose.connection.readyState === 1) {
        try {
            let notes = await Notes.find({ user: req.user.id });
            res.json(notes);
        } catch (error) {
            console.error(error.message);
            return res.status(500).send({"error":"Some error occur.Chek Console"});
        }
    } else {
        console.log("called")
        return res.status(403).send({"error":"Not connected to database"});
    }
});

//Router 2:This router is user for insert notes login require we send auth token localhost:4000/api/notes/addnotes
router.post('/addnotes', fetchuser, [
    body('title', 'Enter notes title').isLength({ min: 3 }),
    body('description', 'Enter notes description').isLength({ min: 3 }),
    body('tag', 'Enter notes tag').isLength({ min: 3 }),
], async (req, res) => {
    const { title, description, tag } = req.body;

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    try {
        let notes = new Notes({
            user: req.user.id, title, description, tag
        });
        let savedNotes = await notes.save();
        res.status(200).json(savedNotes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({"error":"Some error occur.Chek Console"});
    }

});

//Router 3:This router is user for update notes login require we send auth token localhost:4000/api/notes/updatenotes
router.put('/updatenotes/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    //create newNote objet
    let newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };

    //find the note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if (!note) { return res.status(404).send({"error":"Not found"}); }

    if (note.user.toString() !== req.user.id) {
        return res.status(401).send({"error":"Not alloed"});
    }
    // console.log(note.user.toString())
    //new true means create if data is new
    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
    res.status(200).json(note);
});

//Router 4:This router is user for delete notes login require we send auth token localhost:4000/api/notes/deletenotes

router.delete('/deletenotes/:id', fetchuser, async (req, res) => {

    //find the note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if (!note) { return res.status(404).send({"error":"Not found"}); }

    if (note.user.toString() !== req.user.id) {
        return res.status(401).send({"error":"Not found"});
    }
    // console.log(note.user.toString())
    //new true means create if data is new
    note = await Notes.findByIdAndDelete(req.params.id);
    res.status(200).json({ "Success": "Note are deleted", note: note });
});
module.exports = router;