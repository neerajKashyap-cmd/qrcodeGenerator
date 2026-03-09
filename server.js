require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const path = require("path")

const auth = require("./routes/auth")
const qr = require("./routes/qr")

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const staticFolder = path.join(__dirname, "public")
app.use(express.static(staticFolder))

app.set("view engine", "ejs")

const viewsPath = path.join(__dirname, "views")
app.set("views", viewsPath)

const mongoUrl = process.env.MONGO_URI

mongoose.connect(mongoUrl)
.then(() => {
console.log("MongoDB connected")
})
.catch((err) => {
console.log(err)
})

app.use("/auth", auth)
app.use("/qr", qr)

app.get("/", (req, res) => {
res.redirect("/auth/login")
})

let PORT = process.env.PORT
if (!PORT) {
PORT = 3000
}

app.listen(PORT, () => {
console.log("Server running on port " + PORT)
})