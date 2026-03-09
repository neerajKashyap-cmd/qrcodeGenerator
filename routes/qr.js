const express = require("express")
const router = express.Router()

const qrController = require("../controllers/qrController")

router.get("/dashboard",qrController.dashboard)

router.post("/generate",qrController.generateQR)

module.exports = router