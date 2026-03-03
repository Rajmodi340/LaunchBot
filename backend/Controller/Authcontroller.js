import User from "../models/usermodel.js"
import jwt from "jsonwebtoken";

export const googleAuth=async(req,res)=>{

    try{
const {name,email,avatar}=req.body;
if(!email){
    return res.status(400).json({message:"Email is required"})
}
let user = await User.findOne({ email: email })
if(!user){
  user = await User.create({ name, email, avatar })
} else {
  user = await User.findByIdAndUpdate(user._id, { avatar }, { new: true })
}
const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
res.cookie("token",token,{
    httpOnly:true,
    secure:true,
    sameSite:"none",
    maxAge:7*24*60*60*1000
})
res.status(200).json({message:"User created successfully",user,token})


    }
    catch(error){
        res.status(500).json({message:"Internal server error",error:error.message})
    }
}
export const logout=async(req,res)=>{
    try{
    res.clearCookie("token")
    res.status(200).json({message:"User logged out successfully"})}
    catch(error){
        res.status(500).json({message:"Internal server error",error:error.message})
    }
}
