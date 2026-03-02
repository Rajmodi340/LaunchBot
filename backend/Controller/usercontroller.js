export const getCurrentUser=async(req,res,next)=>{
    try{
if(!req.user){
    return res.status(401).json({message:"Unauthorized"})
}
 return res.status(200).json(req.user)
    }
    catch(error){
        res.status(500).json({message:"Internal server error",error:error.message})
    }
}