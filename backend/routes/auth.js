const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();


const users = {
    id:1,
    email : "okasha@gmail.com",
    password : bcrypt.hashSync("123123456,10"),
    name :"Okasha"
};


router.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    const user = users.find(user=>user.email === email);
    if(!user){
        return res.status(401).json({message:"Invalid credentials"});
    }
    const isPasswordValid = bcrypt.compareSync(password,user.password);
    if(!isPasswordValid){
        return res.status(401).json({message:"Invalid credentials"});
    }
});

const token = jwt.sign({id:user.id,email:user.email},process.env.JWT_SECRET,{expiresIn:"1h"})
res.json({token});

module.exports = router;