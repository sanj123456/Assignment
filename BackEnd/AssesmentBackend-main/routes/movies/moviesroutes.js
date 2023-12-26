const express = require("express");
const router = new express.Router();
const moviescontrollers = require("../../controllers/moviescontrollers/moviecontrollers");
const userauthenticate = require("../../middleware/user/userauthenticate");
const moviesupload = require("../../multerconfig/movieStorageConfig");


// movies routes
router.post("/create",[userauthenticate,moviesupload.single("image")],moviescontrollers.createmovie);
router.get("/listing",userauthenticate,moviescontrollers.getAllmovie);
router.get("/details/:id",userauthenticate,moviescontrollers.getSingleMovie);
router.delete("/delete/:id",userauthenticate,moviescontrollers.deleteMovie);
router.patch("/update/:id",[userauthenticate,moviesupload.single("image")],moviescontrollers.updatemovies);





module.exports = router;