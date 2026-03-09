const User = require("../models/User")
const bcrypt = require("bcrypt")

exports.loginPage = (req,res)=>{
res.render("login")
}

exports.registerPage = (req,res)=>{
res.render("register")
}

exports.register = async (req,res)=>{

const {email,password} = req.body

const exist = await User.findOne({email:email})

if(exist){
return res.send("User already exists")
}

const hash = await bcrypt.hash(password,10)

const user = new User({
email:email,
password:hash
})

await user.save()

res.redirect("/auth/login")
}

exports.login = async (req,res)=>{

const {email,password} = req.body

const user = await User.findOne({email:email})

if(!user){
return res.send("User not found")
}

const match = await bcrypt.compare(password,user.password)

if(!match){
return res.send("Wrong password")
}

res.redirect("/qr/dashboard")
}