const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

// ROUTER 1 : --- Get all the Notes using GET : "/api/notes/fetchallnotes".  Login required
router.get('/fetchallnotes', fetchuser ,async(req,res)=>{
   try {
        // Get all Notes of logedin user
        const notes = await Notes.find({user : req.user.id});
        res.json(notes);
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})




// ROUTER 2 : --- Add the Notes using POST : "/api/notes/addnote".  Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid Title').isLength({min :3}),
    body('description', 'Description must be atleast 5 characters').isLength({min:5})
],async(req,res)=>{

    //---If there are errors, return bad request and the errors
    const error= validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()});
    }

    try{

        // Create a new Note
        const {title, description, tag}=req.body;
        const note =new Notes({
            title, description, tag, user:req.user.id
        })
        // Save a Note
        const savenote = await note.save();
        res.json(savenote);

    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})



// ROUTER 3 : --- Update existing Note using PUT : "/api/notes/updatenote".  Login required
router.put('/updatenote/:id', fetchuser, [
    body('title', 'Enter a valid Title').isLength({min :3}),
    body('description', 'Description must be atleast 5 characters').isLength({min:5})
], async(req, res)=>{

    //---If there are errors, return bad request and the errors
    const error= validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()});
    }

    try{
        
        const {title, description, tag}=req.body;

        // Create a new note
        const newnote={};
        if(title){newnote.title=title};
        if(description){newnote.description=description};
        if(tag){newnote.tag=tag};

        //Find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not Found");
        }

        // If the note is found check whether the logedin user is linked to that note
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }

        // Update a note
        note=await Notes.findByIdAndUpdate(req.params.id, {$set:newnote}, {new:true});
        res.json(note);

    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})


// ROUTER 4 : --- Delete an existing Note using Delete : "/api/notes/deletenote".  Login required
router.delete('/deletenote/:id', fetchuser, async(req, res)=>{

    try{

        // First find the note 
        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not Found");
        }

        // Allow deletion only if user owns this Note
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({"Success":"Note has been deleted", note:note});

    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

module.exports = router