const QRModel = require("../models/QR")
const QRCode = require("qrcode")

exports.dashboard = async (req, res) => {

const allQrs = await QRModel.find()

res.render("dashboard", { qrs: allQrs })

}

exports.generateQR = async (req, res) => {

const { qrData, qrType } = req.body

const generatedImage = await QRCode.toDataURL(qrData)

const newQR = new QRModel({
    data: qrData,
    type: qrType,
    qrImage: generatedImage
})

await newQR.save()

res.redirect("/qr/dashboard")

}