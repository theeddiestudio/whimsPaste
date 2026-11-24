import rateLimit from "../config/limit.js";

const rateLimiter = async (req,res,next) => {
    try {
        const id = req.session.userId || req.ip;
        const {success} = await rateLimit.limit(`user_${id}`);
        if(!success) {
            return res.status(429).json({message: "Too many requests, please try later"})
        }
        next();
        } catch (error) {
            console.log("Rate Limiting Error" , error);
            next(error);
        }
}

export default rateLimiter;