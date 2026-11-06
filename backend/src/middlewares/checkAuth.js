import Note from "../models/Note.js";

const checkAuth = async (req, res, next) => {
    try {
        const data = await Note.findById(req.params.id);
        if(!data) return res.status(404).json({message: "Note not found in servers"});
        if(data.author.toString() !== req.user._id.toString()) return res.status(403).json({message: "Not Authorized to access the note."});
        next();
    } catch (error) {
        console.log("error in checkAuth" , error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export default checkAuth;