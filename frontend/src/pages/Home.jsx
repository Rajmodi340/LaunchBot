import React from 'react'
import {AnimatePresence, motion} from "motion/react"
import Loginmodel from '../components/Loginmodel'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Coins } from "lucide-react"
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
function Home() {
  const navigate=useNavigate()
  const highlights=[
    "AI-Powered Website Generation",
    "Customizable Templates",
    "Responsive Design",
  ]
  const [openlogin,setOpenLogin]=useState(false)
  const {userData}=useSelector((state)=>state.user)
  const [openprofile,setOpenProfile]=useState(false)
  const [website,setwebsites]=useState(null)
  const dispatch=useDispatch()
  const handlelogout=async()=>{
    try{
await axios.get(`${serverUrl}/api/auth/logout`, {withCredentials:true})
dispatch(setUserData(null))
setOpenProfile(false)
    }
    catch(error){
console.error("Error logging out:",error)
    }
  }
   useEffect(()=>{
    if(!userData)
      return ;
  const handlegetallwebsite=async()=>{
    
  try{
  const result=await axios.get(`${serverUrl}/api/website/getall`,{withCredentials:true})
  setwebsites(result.data||[])
  
  }
  catch(error){
  console.log(error)
  
  }
  }
  handlegetallwebsite()
    },[userData])
  return (
    <div className='relative min-h-screen bg-[#040404] text-white overflow-hidden'>
   <motion.div
   initial={{y:-40, opacity:0}}
   animate={{y:0, opacity:1}}
   transition={{duration:0.5}}
   className='fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10'
   >
<div className='max-w-7xl mx-auto px-6 py-4 flex justify-between items-center'>
<div className='text-lg font-semibold'>
LaunchBot
</div>
<div className='flex items-center gap-5'>
<div className='hidden md:inline text-sm text-zinc-400 hover:text-white cursor-pointer' onClick={()=>navigate("/pricing")}>
Pricing
</div>
{userData&&<div className=' hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm cursor-pointer hover:bg-white/10 transition' onClick={()=>navigate("/pricing")}>
<Coins className="w-5 h-5 text-yellow-400"></Coins>
<span className='text-zinc-300'>Credits</span>
<span className="ml-2">{userData.credits}</span>
<span className='font-semibold text-zinc-400'>+</span>

  </div>}
{!userData?<button className='px-4 py-2 rounded-lg border-white/20 hover:bg-white/10 text-sm'

onClick={()=>setOpenLogin(true)}
>
  Get Started
</button>:
<div className='relative'>
<button className='flex items-center' onClick={()=>setOpenProfile(true)}><img src={userData?.avatar||`https://ui-avatars.com/api/?name=${userData.name}`} className="w-8 h-8 rounded-full"></img></button>
<AnimatePresence>
  {openprofile&&(
    <>
    <motion.div
      initial={{opacity:0,y:-10,scale:0.95}}
      animate={{opacity:1,y:0,scale:1}}
      exit={{opacity:0,y:-10,scale:0.95}}
      className='absolute right-0 mt-3 w-60 z-50 rounded-xl bg-[#0b0b0b] border border-white/10 shadow-2xl overflow-hidden'
    >
      <div className='p-4 text-center border-b border-white/10' >
        <p className='text-sm font-medium truncate'>{userData.name}</p>
        <p className='text-xs text-zinc-500 truncate'>{userData.email}</p>
      </div>
      <button className='md:hidden w-full px-4 py-3 flex items-center gap-2 text-sm border-b border-white/10 hover:bg-white/5'>
        <Coins className="w-5 h-5 text-yellow-400"></Coins>
<span className='text-zinc-300'>Credits</span>
<span className="ml-2">{userData.credits}</span>
<span className='font-semibold text-zinc-400'>+</span>
      </button>
      <button className='w-full px-4 py-3 text-left text-sm hover:bg-white/5' onClick={()=>navigate("/dashboard")}>Dashboard</button>
      <button className='w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-white/5' onClick={handlelogout}>Logout</button>
    </motion.div>
    </>
  )}
</AnimatePresence>
</div>}

</div>
</div>
   </motion.div>
   <section className='pt-44 pb-32 px-6 text-center'>
<motion.h1
initial={{y:40, opacity:0}}
animate={{y:0, opacity:1}}
transition={{duration:0.5}}
className='text-5xl md:text-7xl font-bold tracking-tight'
>
  Build Stunning Websites<br/>
  <span className='bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent'>with AI</span>
</motion.h1>
<motion.p>
  Describe your idea and let AI generate a modern,responsive,production-ready website.
</motion.p>
<button
  className='px-10 py-4 rounded-xl bg-white text-black font-semibold hover:scale-105 transition mt-12'
  onClick={() => {
    if (userData) navigate("/dashboard");
    else setOpenLogin(true);
  }}
>
  {userData ? "Go to dashboard" : "Get Started"}
</button>
   </section>
   {!userData&&
<section className='max-w-7xl mx-auto px-6 pb-32' >
<div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
  {highlights.map((h, i) => (
    <motion.div
      key={i}
      initial={{y:40, opacity:0}}
      
      whileInView={{opacity:1, y:0}}
      
      className='rounded-2xl bg-white/5 border border-white/10 p-8'
    >
      <h1 className='text-xl font-semibold'>{h}</h1>
      <p className='text-sm text-zinc-400 mt-2'>
        LaunchBot builds real websites clean code,animations,responsiveness and scalable structure.
      </p>
    </motion.div>
  ))}
</div>
   </section>
   }
   
   {userData&& website?.length>0&&(
<section className='max-w-7xl mx-auto px-6 pb-32'>
<h3 className='text-2xl font-semibold mb-6'>
Your Websites
</h3>
<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
  {website.slice(0,3).map((w,i)=>{
    return (
    <motion.div
key={w._id}
whileHover={{y:-6}}
onClick={()=>navigate(`/editor/${w._id}`)}
className='cursor-pointer rounded-2xl bg-white/5 border border-white/10 overflow-hidden'


    >
<div className='relative h-48 bg-black/50 overflow-hidden flex-shrink-0'>
<iframe
  srcDoc={w.latestCode}
  className='absolute inset-0 w-full h-full scale-75 origin-top-left pointer-events-none'
></iframe>
</div>
<div className='p-4'>
  <h3 className='text-sm font-semibold text-white truncate'>{w.title || 'Untitled Website'}</h3>
          <p className='text-xs text-zinc-500 mt-1'>ID: {w._id.slice(-8)}</p>
          <p className='text-xs text-zinc-400 mt-2'>Last Updated: {new Date(w.updatedAt).toLocaleDateString()}</p>
</div>
    </motion.div>
    )
  })}
</div>
</section>
   )}
   <footer className='text-center py-8 text-sm text-zinc-500'>
    &copy;{new Date().getFullYear()} LaunchBot. All rights reserved.
   </footer>
   {openlogin && <Loginmodel open={openlogin} onclose={()=>setOpenLogin(false)}/>}
    </div>
  )
}

export default Home
