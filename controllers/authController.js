const User = require("../models/User")
const bcrypt = require("bcrypt")

exports.loginPage = (req, res) => {
res.render("login")
}

exports.registerPage = (req, res) => {
res.render("register")
}

exports.registerUser = async (req, res) => {

const { userEmail, userPassword } = req.body

const existingUser = await User.findOne({ email: userEmail })

if (existingUser) {
    return res.send("User already exists")
}

const hashedPass = await bcrypt.hash(userPassword, 10)

const newUser = new User({
    email: userEmail,
    password: hashedPass
})

await newUser.save()

res.redirect("/auth/login")

}

exports.loginUser = async (req, res) => {

const { userEmail, userPassword } = req.body

const foundUser = await User.findOne({ email: userEmail })

if (!foundUser) {
    return res.send("User not found")
}

const validPassword = await bcrypt.compare(userPassword, foundUser.password)

if (!validPassword) {
    return res.send("Wrong password")
}

res.redirect("/qr/dashboard")

}