import User from '../models/User.js';
import bcrypt from 'bcrypt';

const checkLogin = (req,res) => {
    if(req.session.userId) {
        return res.status(200).json({isLogged: true});
    } else {
        return res.status(200).json({isLogged: false});
    }
}

const loginUser = async (req,res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(!user) {
        return res.status(404).json({message: "User not found"})
    }

    const passCompare = await bcrypt.compare(password, user.password);
    if (!passCompare) {
        return res.status(403).json({message: "Password Incorrect"});
    }

    req.session.userId = user._id;
    res.status(201).json({message: "User logged in"});
}

const logoutUser = async (req, res) => {
    req.session.destroy((error) => {
        if(error) {
            console.log("Error while logout", error);
            return res.status(500).json({message: "Could not logout"});
        }
        res.clearCookie('connect.sid');
        return res.status(200).json({message: "User logged out successfully"});
    })
}

const registerUser = async (req,res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(!user) {
        const hashPw = await bcrypt.hash(password, 12);
        const newUser = new User({email, password: hashPw});
        await newUser.save();
        req.session.userId = newUser._id;
        return res.status(201).json({message: "User Registered"});
    }

    res.status(400).json({message: "User Already Exists"});
}

export {loginUser, logoutUser, registerUser , checkLogin};