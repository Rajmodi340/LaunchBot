import express from"express"
import { googleAuth } from "../Controller/Authcontroller.js"
import { logout } from "../Controller/Authcontroller.js"
const router=express.Router()
router.post("/google",googleAuth)
router.get("/logout",logout)
export default router