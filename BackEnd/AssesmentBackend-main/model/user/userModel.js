const mongoose = require("mongoose");
const validator = require("validator")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRECT_KEY = process.env.SECRECT_KEY

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("not valid email")
            }
        }
    },
    password: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ],
},{timestamps:true});

// password hashing
userSchema.pre("save", async function (next) {

    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next()
});

// token generate
userSchema.methods.generateAuthtoken = async function () {
    try {
        let newtoken = jwt.sign({ _id: this._id }, SECRECT_KEY, {
            expiresIn: "1d"
        });

        this.tokens = this.tokens.concat({ token: newtoken });
        await this.save();
        return newtoken;
    } catch (error) {
        res.status(400).json({ error: error })
    }
}

// model
const userDB = new mongoose.model("users",userSchema);
module.exports = userDB;