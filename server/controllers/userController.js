import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const generateToken =(userId)=>{
  const payload = userId;
  return jwt.sign(payload,process.env.JWT_SECRET)
}

export const registerUser = async(req,res)=>{
  try {
    const {name,email,password}=req.body;
    if(!name || !email || !password || password.length <8){
      
      return res.status(400).json({sucess:false,message:"fill all the field"})
    }
    const userExists = await User.findOne({email})
    if (userExists){
       return res.status(400).json({sucess:false,message:"existing user"})
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const user = await User.create({name,email,password:hashedPassword})
    const token = generateToken(user._id.toString())

    res.status(200).json({sucess:true,user,token})
  } catch (error) {
    console.log(error.message)
    res.json({sucess:false,message:error.message})
  }
}

export const loginUser = async(req,res)=>{
  try {
    const {email,password}=req.body
    const user = await User.findOne({email})
    if(!user){
      return res.json({sucess:false, message:'User not found'})
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
       return res.status(401).json({sucess:false, message:'wrong password'})
    }
    const token =generateToken(user._id.toString())
        res.status(200).json({sucess:true,user,token})
  } catch (error) {
   console.log(error.message)
    res.json({sucess:false,message:error.message}) 
  }
}

export const getUserData = async (req,res)=>{
  try {
    const {user}=req;
    res.json({sucess:true,user})
  } catch (error) {
   console.log(error.message)
    res.json({sucess:false,message:error.message}) 
  }
}
