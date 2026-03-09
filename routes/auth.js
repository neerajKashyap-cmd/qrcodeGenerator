const express = require("express")
const router = express.Router()

const authCtrl = require("../controllers/authController")

router.get("/login", authCtrl.loginPage)

router.get("/register", authCtrl.registerPage)

router.post("/register", authCtrl.registerUser)

router.post("/login", authCtrl.loginUser)

module.exports = router