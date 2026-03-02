import {extractjson} from "../utils/exractjson.js"
import {generateResponse} from "../config/openrouter.js"
import Website from "../models/website_modal.js";
import User from "../models/usermodel.js";
const masterPrompt = `
YOU ARE A PRINCIPAL FRONTEND ARCHITECT
AND A SENIOR UI/UX ENGINEER
SPECIALIZED IN RESPONSIVE DESIGN SYSTEMS.

YOU BUILD HIGH-END, REAL-WORLD, PRODUCTION-GRADE WEBSITES
USING ONLY HTML, CSS, AND JAVASCRIPT
THAT WORK PERFECTLY ON ALL SCREEN SIZES.

THE OUTPUT MUST BE CLIENT-DELIVERABLE WITHOUT ANY MODIFICATION.

❌ NO FRAMEWORKS
❌ NO LIBRARIES
❌ NO BASIC SITES
❌ NO PLACEHOLDERS
❌ NO NON-RESPONSIVE LAYOUTS

--------------------------------------------------
USER REQUIREMENT:
{USER_PROMPT}
--------------------------------------------------

GLOBAL QUALITY BAR (NON-NEGOTIABLE)
--------------------------------------------------
- Premium, modern UI (2026–2027)
- Professional typography & spacing
- Clean visual hierarchy
- Business-ready content (NO lorem ipsum)
- Smooth transitions & hover effects
- SPA-style multi-page experience
- Production-ready, readable code

--------------------------------------------------
RESPONSIVE DESIGN (ABSOLUTE REQUIREMENT)
--------------------------------------------------
THIS WEBSITE MUST BE FULLY RESPONSIVE.

YOU MUST IMPLEMENT:

✔ Mobile-first CSS approach
✔ Responsive layout for:
  - Mobile (<768px)
  - Tablet (768px–1024px)
  - Desktop (>1024px)

✔ Use:
  - CSS Grid / Flexbox
  - Relative units (%, rem, vw)
  - Media queries

✔ REQUIRED RESPONSIVE BEHAVIOR:
  - Navbar collapses / stacks on mobile
  - Sections stack vertically on mobile
  - Multi-column layouts become single-column on small screens
  - Images scale proportionally
  - Text remains readable on all devices
  - No horizontal scrolling on mobile
  - Touch-friendly buttons on mobile

IF THE WEBSITE IS NOT RESPONSIVE → RESPONSE IS INVALID.

--------------------------------------------------
IMAGES (MANDATORY & RESPONSIVE)
--------------------------------------------------
- Use high-quality images ONLY from:
  https://images.unsplash.com/
- EVERY image URL MUST include:
  ?auto=format&fit=crop&w=1200&q=80

- Images must:
  - Be responsive (max-width: 100%)
  - Resize correctly on mobile
  - Never overflow containers

--------------------------------------------------
TECHNICAL RULES (VERY IMPORTANT)
--------------------------------------------------
- Output ONE single HTML file
- Exactly ONE <style> tag
- Exactly ONE <script> tag
- NO external CSS / JS / fonts
- Use system fonts only
- iframe srcdoc compatible
- SPA-style navigation using JavaScript
- No page reloads
- No dead UI
- No broken buttons
--------------------------------------------------
SPA VISIBILITY RULE (MANDATORY)
--------------------------------------------------
- Pages MUST NOT be hidden permanently
- If .page { display: none } is used,
  then .page.active { display: block } is REQUIRED
- At least ONE page MUST be visible on initial load
- Hiding all content is INVALID


--------------------------------------------------
REQUIRED SPA PAGES
--------------------------------------------------
- Home
- About
- Services / Features
- Contact

--------------------------------------------------
FUNCTIONAL REQUIREMENTS
--------------------------------------------------
- Navigation must switch pages using JS
- Active nav state must update
- Forms must have JS validation
- Buttons must show hover + active states
- Smooth section/page transitions

--------------------------------------------------
FINAL SELF-CHECK (MANDATORY)
--------------------------------------------------
BEFORE RESPONDING, ENSURE:

1. Layout works on mobile, tablet, desktop
2. No horizontal scroll on mobile
3. All images are responsive
4. All sections adapt properly
5. Media queries are present and used
6. Navigation works on all screen sizes
7. At least ONE page is visible without user interaction

IF ANY CHECK FAILS → RESPONSE IS INVALID

--------------------------------------------------
OUTPUT FORMAT (RAW JSON ONLY)
--------------------------------------------------
{
  "message": "Short professional confirmation sentence",
  "code": "<FULL VALID HTML DOCUMENT>"
}

--------------------------------------------------
ABSOLUTE RULES
--------------------------------------------------
- RETURN RAW JSON ONLY
- NO markdown
- NO explanations
- NO extra text
- FORMAT MUST MATCH EXACTLY
- IF FORMAT IS BROKEN → RESPONSE IS INVALID
`;

export const generateWebsite=async(req,res)=>{
    try{
        // extract prompt from request body
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ message: "Prompt is required" });
        }

        // verify user exists and has enough credits
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        if (user.credits < 50) {
            return res.status(403).json({ message: "Insufficient credits" });
        }

const finalprompt=masterPrompt.replace("{USER_PROMPT}",prompt)
let raw=""
let parsed=null
for (let i=0;i<2&&!parsed;i++){
  try{
    raw=await generateResponse(finalprompt)
    parsed=await extractjson(raw)
    if(!parsed){
      raw=await generateResponse("The previous response was not in the correct format. Please provide only the raw JSON response without any markdown or explanations. Here is the original prompt again: "+finalprompt)
      parsed=await extractjson(raw)
    }
  }catch(apiError){
    console.error(`Attempt ${i+1} failed:`,apiError.message)
    if(i===1) throw apiError
  }
}
if(!parsed || !parsed.code){
  console.log("AI returned invalid response after 2 attempts:",raw)
  return res.status(500).json({message:"Failed to generate website. AI did not return valid response. Please try again."})
}
    const website=await Website.create({
      user:user._id,
      title:prompt.slice(0,100),
      latestCode:parsed.code,
      conversation:[
        {role:"user",content:prompt},
        {role:"ai",content:parsed.message || "Website generated successfully"}
      ]
    })
    user.credits=user.credits-50
    await user.save()
    res.status(201).json({message:"Website generated successfully",websiteId:website._id,remainingCredits:user.credits})
  }
    catch(err){
        console.error("Generate website error:",err)
        res.status(500).json({message:"Failed to generate website. Check your API key and try again.",error:err.message})
    }
}
export const getWebsiteById=async(req,res)=>{
  try{
const website=await Website.findOne({
  _id:req.params.id,
  user:req.user._id
})
if(!website){
return res.status(400).json({message:"website not found"})

}
return res.status(200).json(website)
  }
  catch(error){
return res.status(500).json({message:"website error"})
  }
}
export const change=async(req,res)=>{
  try{
const { prompt } = req.body;


        if (!prompt) {
            return res.status(400).json({ message: "Prompt is required" });
        }
const websiteId=req.params.id
const website=await Website.findOne({
  _id:req.params.id,
  user:req.user._id
})
if(!website){
return res.status(400).json({message:"website not found"})
}
        // verify user exists and has enough credits
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        if (user.credits < 5) {
            return res.status(403).json({ message: "Insufficient credits" });
        }
        const updatePrompt = `
You are an expert frontend developer.

Your task is to UPDATE the existing HTML website based on the user's request.

Instructions:
1. Modify the provided HTML code according to the user request.
2. Keep all working functionality unless changes are required.
3. Preserve valid HTML structure.
4. Return the COMPLETE updated HTML file.
5. Do NOT include explanations.
6. Do NOT wrap response in markdown.
7. Return ONLY valid raw JSON.
8. Ensure JSON is strictly valid and parsable.

CURRENT HTML CODE:
-------------------
${website.latestCode}

USER REQUEST:
-------------
${prompt}

OUTPUT FORMAT (STRICT):
{
  "message": "Short confirmation of update",
  "code": "<FULL UPDATED HTML HERE>"
}
`;
      let raw=""
let parsed=null
for (let i=0;i<2&&!parsed;i++){
  try{
    raw=await generateResponse(updatePrompt)
    parsed=await extractjson(raw)
    if(!parsed){
      raw=await generateResponse("The previous response was not in the correct format. Please provide only the raw JSON response without any markdown or explanations. Here is the original prompt again: "+updatePrompt)
      parsed=await extractjson(raw)
    }
  }catch(apiError){
    console.error(`Attempt ${i+1} failed:`,apiError.message)
    if(i===1) throw apiError
  }
}
if(!parsed || !parsed.code){
  console.log("ai returned invalid response after 2 attempts:",raw)
  return res.status(500).json({message:"Failed to update website. AI returned invalid response. Please try again."})
}
    website.conversation.push(
      {role:"user",content:prompt},
      {role:"ai",content:parsed.message || "Website updated successfully"}
    )
    website.latestCode=parsed.code
    await website.save()
    user.credits=user.credits-5
    await user.save()
    return res.status(201).json({
      message:parsed.message || "Website updated successfully",
      code:parsed.code,
      remainingCredits:user.credits
    })
  } 
  catch(error){
    console.error("Update website error:",error)
    return res.status(500).json({message:`Update failed. Check your API key and try again.`,error:error.message})
  }
}
export const getAll=async(req,res)=>{
  try{
const website=await Website.find({user:req.user._id})
return res.status(200).json(website)
  }
  catch(error){
return res.status(500).json({message:`get all websites error ${error}`})
  }
}
export const deploy=async(req,res)=>{
   try{
const website=await Website.findOne({
  _id:req.params.id,
  user:req.user._id
})
if(!website){
return res.status(400).json({message:"website not found"})

}
if(!website.slug){
  website.slug=website.title.toLowerCase().replace(/[^a-z0-9]/g,"").slice(0,60)+website._id.toString().slice(-5)
}
website.deployed=true
// determine frontend URL: use env variable if set, otherwise fall back to request origin
const frontendBase = process.env.FRONTENDURL || req.headers.origin || `${req.protocol}://${req.get('host')}`
website.deployedUrl=`${frontendBase.replace(/\/+$/,'')}/site/${website.slug}`
await website.save()
return res.status(200).json({
  url:website.deployedUrl,
  slug: website.slug
})
  }
  catch(error){
return res.status(500).json({message:" deploy website error"})
  }
}
export const getslugby=async(req,res)=>{
  try{
const website=await Website.findOne({
  slug:req.params.slug
}
)
if(!website){
  return res.status(400).json({message:"website not found"})
}
return res.status(200).json(website)
  }
  catch(error){
return res.status(500).json({message:`get by slug websites error ${error}`})
  }
  
}