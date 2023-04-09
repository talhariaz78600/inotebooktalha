const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');
//////////////Routes 1 :Get All the notes using: Get "/api/notes/fetchallnotes."///////////////////
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {

        const notes = await Notes.find({ user: req.user.id });

        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("interval Server error")
    }
})
//////////////Routes 2 :Add the new the notes using: Get "/api/notes/addnote."////////////////////
router.post('/addnote', fetchuser, [

    body('title', 'title must be atleast 5 character').isLength({ min: 3 }),
    body('description', 'Enter the valid name').isLength({ min: 5 })
], async (req, res) => {
    try {

        const { title, description, tag } = req.body;
        // if there are error ,return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
         note.save();
         res.json(note);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("interval Server error")
    }
})
//////////////Routes 3 :update  the notes using: Get "/api/notes/updatenote. Login required"///////
router.put('/updatenote/:id', fetchuser,  async (req, res) => {
const {title,description,tag}=req.body;
///create anewnote objects////
const newNote={};
if(title){newNote.title=title};
if(description){newNote.description=description};
if(tag){newNote.tag=tag};
////////////////Find the note to be updated and updated it/////////////
let note=await Notes.findById(req.params.id);
if(!note){ return res.status(404).send("not found")}
if(note.user.toString()!==req.user.id){
    return res.status(401).send("not allowed");
}
note= await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
res.json({note});

})
//////////////Routes  :delete  the notes using: Get "/api/notes/updatenote. Login required"
router.delete('/deletenote/:id', fetchuser,  async (req, res) => {
    // const {title,description,tag}=req.body;

   
    ////////////////Find the note to be updated and updated it/////////////
    let note=await Notes.findById(req.params.id);
    if(!note){ return res.status(404).send("not found")}
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("not allowed");
    }
    note= await Notes.findByIdAndDelete(req.params.id)
    res.json({"note":"note deleted has been successfull"});
    
    })
module.exports = router;