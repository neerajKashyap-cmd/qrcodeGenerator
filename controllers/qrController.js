const QR = require("../models/QR")
const QRCode = require("qrcode")

exports.dashboard = async (req,res)=>{

const qrs = await QR.find()

res.render("dashboard",{qrs:qrs})
}

exports.generateQR = async (req,res)=>{

const {data,type} = req.body

const qrImage = await QRCode.toDataURL(data)

const qr = new QR({
data:data,
type:type,
qrImage:qrImage
})

await qr.save()

res.redirect("/qr/dashboard")
}