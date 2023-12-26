require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conn");
const cors = require("cors");
const PORT = 4005;


app.use(cors());
app.use(express.json());


app.get("/",(req,res)=>{
    res.status(200).json("server start");
})

// user routes
const userAuthroutes = require("./routes/user/userAuthroutes");
app.use("/userauth/api",userAuthroutes);

// movies routes
const moviesroutes = require("./routes/movies/moviesroutes");
app.use("/movies/api",moviesroutes);

// listen app
app.listen(PORT,()=>{
    console.log(`server start at ${PORT}`)
});