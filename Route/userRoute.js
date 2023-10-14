const express = require("express")
const { loginuser, registeruser, currentUser,updatePassword } = require("../Controller/userController")
const validation = require("../middleware/validationHandler")
const router = express.Router()


router.route("/login").post(loginuser)

router.route("/register").post(registeruser)

router.route("/current").get(validation,currentUser)

router.route("/updatePassword").post(validation,updatePassword)

module.exports=router












































