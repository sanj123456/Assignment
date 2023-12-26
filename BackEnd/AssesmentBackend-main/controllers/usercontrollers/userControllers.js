const userDB = require("../../model/user/userModel");
const bcrypt = require("bcryptjs");


// user register
exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: "All fields Are required" });
    }else{
        try {
            const existinguser = await userDB.findOne({ email: email });
    
            if (existinguser) {
                res.status(400).json({ error: "This user is already exist" });
            } else {
                const userData = new userDB({
                    username, email, password
                });
    
                // password hasing
                await userData.save();
                res.status(200).json({ message: "user sucessfully registerd" });
            }
        } catch (error) {
            console.log("error catch",error)
            res.status(400).json({ error: error });
        }
    }
}

// user login
exports.Login = async(req,res)=>{
    const {email,password} = req.body;

    if (!email || !password) {
        res.status(400).json({ error: "fill all the details" })
    }else{
        try {
            const userValid = await userDB.findOne({ email: email });
    
            if(userValid){
                const isMatch = await bcrypt.compare(password, userValid.password);
    
                if(!isMatch){
                    res.status(400).json({ error: "invalid details" })
                }else{
                     // token generate
                     const token = await userValid.generateAuthtoken();
    
                     res.status(200).json({message:"user sucessfully login",token})
                }
            }else{
                res.status(400).json({error: "This User is not exist" })
            }
        } catch (error) {
            console.log("error catch",error)
            res.status(400).json({ error: error });
        }
    }
}

// user verify
exports.userVerify = async(req,res)=>{
    try {
        const Verifyuser = await userDB.findOne({_id:req.userId}).select({"username":1,"email":1});

        res.status(200).json(Verifyuser);
    } catch (error) {
        console.log("error catch",error)
        res.status(400).json({ error: error });  
    }
}

// user logout
exports.Logout = async(req,res)=>{
    try {
        req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
            return curelem.token !== req.token
        });

        req.rootUser.save();

        res.status(200).json({ message: "user successfully logout" })
    } catch (error) {
        console.log("error catch",error)
        res.status(400).json({ error: error });  
    }
}