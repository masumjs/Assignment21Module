const express = require('express');
const authVerify = require('../app/middleware/authMiddleware.js');
const  userController = require("../app/controller/userController.js")

const router = express.Router();

// User Registration

router.post("/register",userController.register);
router.post("/login",userController.login);
router.get("/profile", authVerify,userController.profile)
router.get("/allProfile",userController.allProfile)
router.put("/updateUserData",authVerify,userController.updateUserData)
router.delete("/deleteProfile",authVerify,userController.deleteProfile)



module.exports = router;
