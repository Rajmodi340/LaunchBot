import express from "express"
import { getCurrentUser } from "../Controller/usercontroller.js"
import isAuth from "../middleware/middleware.js"
const userroute=express.Router()
userroute.get("/me",isAuth,getCurrentUser)

export default userroute