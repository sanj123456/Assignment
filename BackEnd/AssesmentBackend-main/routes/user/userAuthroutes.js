const express = require("express");
const router = new express.Router();
const userAuthController = require("../../controllers/usercontrollers/userControllers");
const userauthenticate = require("../../middleware/user/userauthenticate");

// user auth routes
router.post("/register",userAuthController.register);
router.post("/login",userAuthController.Login);
router.get("/verifyuser",userauthenticate,userAuthController.userVerify);
router.get("/logout",userauthenticate,userAuthController.Logout);


module.exports = router;