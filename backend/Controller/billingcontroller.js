import { PLANS } from "../config/plan.js"
import stripe from "../config/stripe.js"
import User from "../models/usermodel.js"
export const billing=async(req,res)=>{
    try{
        const {planType}=req.body 
     
        const userId=req.user._id
        const plan=PLANS[planType]
        if(!plan||plan.price==0){
            return res.status(400).json({message:"invalid paid plan"})
        }
        const session= await stripe.checkout.sessions.create({
            mode:"payment",
            payment_method_types:["card"],
            line_items:[
               {price_data:{
                currency:"inr",
                product_data:{
                    name:`LaunchBot ${planType.toUpperCase()}plan`
                },
                unit_amount:plan.price*100
               },
               quantity:1
            } 
            ],
            metadata:{
               userId: userId.toString(),
                credits:plan.credits,
                plan:plan.plan
            },
           
            success_url:`${process.env.FRONTENDURL}/?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url:`${process.env.FRONTENDURL}/pricing`
        })
        return res.status(200).json({
            sessionUrl:session.url
        })
    }
    catch(error){
        console.error("billing controller error", error)
        return res.status(500).json({message:`billing error:${error.message || error}`})
    }
}
export const verifyPayment=async(req,res)=>{
    try{
        const {session_id}=req.body
        if(!session_id){
            return res.status(400).json({message:"Session ID required"})
        }
        const session=await stripe.checkout.sessions.retrieve(session_id)
        if(session.payment_status==="paid"){
            const userId=session.metadata.userId
            const credits=Number(session.metadata.credits)
            const plan=session.metadata.plan
            await User.findByIdAndUpdate(userId,{
                $inc:{credits:credits},
                plan:plan
            })
            const user=await User.findById(userId)
            return res.status(200).json({message:"Credits updated",credits:user.credits})
        }else{
            return res.status(400).json({message:"Payment not completed"})
        }
    }
    catch(error){
        console.error("verify payment error",error)
        return res.status(500).json({message:"Verify payment error"})
    }
}