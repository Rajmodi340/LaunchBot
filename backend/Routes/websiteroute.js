import express from "express"
import isAuth from "../middleware/middleware.js"
import { change, deploy, generateWebsite, getAll, getslugby, getWebsiteById } from "../Controller/websitecontroller.js"
const websiteroute=express.Router()
websiteroute.post("/generate",isAuth,generateWebsite)
websiteroute.get("/getbyid/:id",isAuth,getWebsiteById)
websiteroute.get("/getall",isAuth,getAll)
websiteroute.post("/update/:id",isAuth,change)
websiteroute.get("/deploy/:id",isAuth,deploy)
websiteroute.get("/getbyslug/:slug",getslugby)
export default websiteroute