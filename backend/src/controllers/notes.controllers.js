import Note from "../models/Note.js";
import User from "../models/User.js";

export async function getAllNotes (req,res) {
    try {
        const data = await User.findById(req.user._id).populate('notes');
        res.status(200).json(data.notes);
    } catch (error) {
        console.log("error in getAllNotes" , error);
        res.status(500).json({message: "Internal Server Error"});
    }
}
export async function showNote (req,res) {
    try {
        const data = await Note.findById(req.params.id);
        res.status(200).json(data);
    } catch (error) {
        console.log("error in showNote" , error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export async function addNewNote (req,res) {
    try {
        const {title, body} = req.body;
        const author = await User.findById(req.user._id);
        const data = new Note({title, body});
        author.notes.push(data);
        data.author = author;
        await author.save();
        await data.save();
        res.status(201).json({message: "Note created successfully..."})
    } catch (error) {
        console.log("error in addNewNote" , error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export async function updateNote (req,res) {
    try {
        const {title,body} = req.body;
        await Note.findByIdAndUpdate(req.params.id, {title, body});
        res.status(200).json({message: "Note updated successfully"});   
    } catch (error) {
        console.log("error in updateNote" , error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export async function deleteNote (req,res) {
    try {
        const data = await Note.findByIdAndDelete(req.params.id);
        
        // now pull away the note with the above id.
        await User.findByIdAndUpdate(req.user._id, {
            $pull: {notes: data._id}
        }); 
        res.status(200).json({message: "Note deleted successfully"});
    } catch (error) {
        console.log("error in deleteNote" , error);
        res.status(500).json({message: "Internal Server Error"});
    }
}