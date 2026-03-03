import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js"
import router from "./Routes/authroute.js"
import cookieParser from "cookie-parser"
import userroute from "./Routes/userroute.js"
import websiteroute from "./Routes/websiteroute.js"
import cors from "cors"
import billingrouter from "./Routes/billingroute.js"
import {stripeWebhook } from "./Controller/Stripewehbook.js"
dotenv.config()
const app=express()
app.post("/api/stripe/wehbook",express.raw({type:"application/json"}),stripeWebhook)
app.use(express.json())
app.use(cookieParser())
// enable CORS for frontend and allow credentials
app.use(cors({
    origin: "https://launchbot-7.onrender.com",
    credentials: true,
}))

// allow popups to communicate with opener (prevents COOP from blocking window.closed)
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups')
    next()
})

app.use("/api/auth", router)
app.use("/api/user",userroute)
app.use("/api/website",websiteroute)

// the billing router must include the leading slash otherwise express
// will never match requests made to `/api/billing` (the missing slash
// was causing 404 responses from the frontend).
app.use("/api/billing",billingrouter)

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
    connectDb()
})
