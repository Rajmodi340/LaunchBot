import jwt from "jsonwebtoken"
import User from "../models/usermodel.js"
const isAuth=async(req,res,next)=>{
    try{
const token=req.cookies.token
if(!token){
    return res.status(401).json({message:"Unauthorized"})
}
const decoded=jwt.verify(token,process.env.JWT_SECRET)
req.user= await User.findById(decoded.id).select("-password")
 // exclude password from user object
 next()
    }
    catch(error){
        res.status(500).json({message:"Internal server error",error:error.message})
    }
}
export default isAuth