require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const path = require("path")

const authRoutes = require("./routes/auth")
const qrRoutes = require("./routes/qr")

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// STATIC FILES (CSS, JS, images)
app.use(express.static(path.join(__dirname, "public")))

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err))

app.use("/auth", authRoutes)
app.use("/qr", qrRoutes)

app.get("/", (req, res) => {
    res.redirect("/auth/login")
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Server running on port 3000")
})