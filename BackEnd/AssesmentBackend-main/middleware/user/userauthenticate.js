const userDB = require("../../model/user/userModel");
const jwt = require("jsonwebtoken");
const SECRECT_KEY = process.env.SECRECT_KEY

const userauthenticate = async(req,res,next)=>{

    try {
        const token = req.headers.authorization;
        
        const verifytoken = jwt.verify(token,SECRECT_KEY);
        
        const rootUser = await userDB.findOne({_id:verifytoken._id});
        
        if(!rootUser) {throw new Error("user not found")}

        req.token = token
        req.rootUser = rootUser
        req.userId = rootUser._id
        req.userMainId = rootUser.id // for get carts

        next();

    } catch (error) {
        res.status(400).json({ error: "Unauthorized no token provide" })
    }
}

module.exports = userauthenticate;