const express=require('express')
const User= require('../models/User')
const router=express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET='talhaisgoodboy';
var fetchuser=require('../middleware/fetchuser')
/////////////////////////////Router 1//////////////////////////////////
router.post('/createuser',[
    body('email','Enter the valid email').isEmail(),
    body('password','message must be atleast 5 character').isLength({ min: 5 }),
    body('name','Enter the valid name').isLength({ min: 5 })

],async (req,res)=>{
  // if there are error ,return Bad request and the errors
  let success=false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array() });
  }

    try{
    let user=await User.findOne({email:req.body.email})
    if (user){
      return res.status(400).json({success,errors: "sorry this user already exists"})
    }
    const salt= await bcrypt.genSalt(10);
   const secPass= await bcrypt.hash(req.body.password,salt)
    // create a new user
    user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      })
      const data={
        user:{
          id:user.id
        }
      }
      success=true;
    const authtoken=jwt.sign(data,JWT_SECRET);
    
    res.json({authtoken,success});
    
    } catch(error){
      console.error(error.message);
      res.status(500).send("some error occuers")
    }
})
//////////////////Authentication a user using : post "/api/auth/login".No login required/////////
/////////////router 2/////////////////////////
router.post('/login',[
  body('email','Enter the valid email').isEmail(),
  body('password','password cannot be blank').exists(),
  

],async (req,res)=>{
  let success=false;
  // if there are error ,return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    success=false;
    return res.status(400).json({success, errors: errors.array() });
  }
  const {email,password}=req.body;
  try {
    success=false;
    let user=await User.findOne({email});
    if(!user){
      return res.status(400).json({success,error:"please try to login correct credentals"})
    }
    const  passwordcompare= await bcrypt.compare(password,user.password);
    if(!passwordcompare){
      return res.status(400).json({success,error:"please try to login correct credentals"});
    }
    const data={
      user:{
        id:user.id,
      }
    }
    
      success=true;
      const authtoken=jwt.sign(data,JWT_SECRET);
      res.json({authtoken,success})
      
      
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("interval Server error")
  }
})
//////////////////Get login deatials user using : post "/api/auth/getuser" login required/////////
//router 3/////
router.post('/getuser',fetchuser,async (req,res)=>{
try {
  const userId=req.user.id;
  const user=await User.findById(userId).select("-password") ;
  res.json(user);
  
} catch (error) {
  console.error(error.message);
  res.status(500).send("interval Server error")
}
})
module.exports=router;
