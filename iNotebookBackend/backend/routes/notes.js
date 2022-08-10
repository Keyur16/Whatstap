const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
var fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');



//ROUTE 1: Get all notes using GET: "/api/notes/fetchallnotes"  Login required
router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    
    try {
        const notes = await Notes.find({user: req.user.id});
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    } 
    

})

//ROUTE 2: Add a new note using POST: "/api/notes/addnote" Login required
router.post('/addnote',fetchuser,[
    body('title','Title should be atleast 3 characters').isLength({ min: 3 }),
    body('description','description should be atleast 5 characters').isLength({ min: 5 }),
],async (req,res)=>{

    try {

        const {title, description, tag} = req.body;

        //if there are errors send bad request and error response
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const note = new Notes (
            {title,description,tag,user: req.user.id} 
        )
        const savedNote = await note.save()
        res.json(savedNote)

    
        
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
} 

})


//ROUTE 3: Update an existing note using PUT: "/api/notes/updatenote"  Login required
router.put('/updatenote/:id',fetchuser,async (req,res)=>{

    const {title, description, tag} = req.body;

    try {

    //create a newNote object
    const newNote={};

    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    //Find the note to be updated
    let note = await Notes.findById(req.params.id);
    if(!note){return res.status(404).send('Not Found')};

    if(note.user.toString() !== req.user.id){
        return res.status(401).send('Not Allowed')
    };

    note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
    res.json(note);

    
        
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
}

})


//ROUTE 4: Delete an existing note using DELETE: "/api/notes/deletenote"  Login required
router.delete('/deletenote/:id',fetchuser,async (req,res)=>{

    const {title, description, tag} = req.body;

    try {

    //Find the note to be deleted and delete it
    let note = await Notes.findById(req.params.id);
    if(!note){return res.status(404).send('Not Found')};

    //allow deletion only if user owns this note
    if(note.user.toString() !== req.user.id){
        return res.status(401).send('Not Allowed')
    };

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({"Success": "Note has been deleted", note: note});

    
        
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
}

})

module.exports = router