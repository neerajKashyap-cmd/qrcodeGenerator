const mongoose = require("mongoose")

const qrSchema = new mongoose.Schema({

data:String,

type:String,

qrImage:String,

scanCount:{
type:Number,
default:0
},

createdAt:{
type:Date,
default:Date.now
}

})

module.exports = mongoose.model("QR",qrSchema)