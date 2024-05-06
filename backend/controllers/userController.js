const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const User =require('../models/userModel')


//REGISTER AREA
const registerUser = asyncHandler(async (req,res)=>{
     
   // check if all fields are filled
    const{name, email, password} = req.body
    if(!name || !email || !password){
      res.status(400)
      throw new Error ("please fill all the fields")
    }

    //find if user already exist
    const userExist = await User.findOne({email:email})
    if(userExist){
      console.log("email check")
      res.status(400)
      throw new Error('user already exists')
    }

    //hash password 
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    //create user
    const user = await User.create({
      name,
      email,
      password : hashPassword
    })

 // if user create hua
 if(user){
  res.status(201).json({
    _id : user._id,
    name : user.name,
    email : user.email,
    token : generatetoken(user._id)
  })
 }else{
  res.status(400)
  throw new Error("can't create")
 }

    res.send("this is register user from controller")  
});


//LOGIN AREA
const loginUser = asyncHandler(async(req,res) => {
   const{email, password} = req.body;

   if (!email ||!password){
    res.status(400);
    throw new Error("please Include All Fields");

   }
  
   //find user
   const user = await User.findOne({email})

   //check password
   if(user && (await bcrypt.compare(password,user.password)))
   {res.json({
    _id : user.id,
    name : user.name,
    email : user.email,
    token : generatetoken(user._id)

   })
  } else{
    res.status(401)
    throw new Error("invalid input")
  }
    
});

//generate token

const generatetoken = (id) =>{
  return jwt.sign({id}, process.env.JWT_SECRECT,{
    expiresIn: '30d',
  })
}


//protected me
const getMe = (req,res) =>{
  res.send("me route")
}

module.exports= {registerUser, loginUser, getMe}