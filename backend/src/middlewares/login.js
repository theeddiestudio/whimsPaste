import User from "../models/User.js";

const isLogged = async (req, res, next) => {
    // if user has not logged in
    if(!req.session.userId) {
        return res.status(401).json({message: "User has not logged in"});
    }
    try {
        const user = await User.findById(req.session.userId);
        // user has logged in but has no data in the database. (unknown user)
        if (!user) {
            return res.status(404).json({message: "No user found"});
        }
        req.user = user;
        next();
    } catch (error) {
        console.error("Error authenticating user" , error);
        next(error);
    }
}

const isNotLogged = async (req, res, next) => {
    if(req.session.userId) {
        return res.status(401).json({message: "User already logged in"});
    }

    next();
}

export {isLogged , isNotLogged};