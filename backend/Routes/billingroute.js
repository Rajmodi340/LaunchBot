import express from "express"
import isAuth from "../middleware/middleware.js"
import { billing, verifyPayment } from "../Controller/billingcontroller.js"
const billingrouter=express.Router()
billingrouter.post("/",isAuth,billing)
billingrouter.post("/verify",isAuth,verifyPayment)
export default billingrouter
