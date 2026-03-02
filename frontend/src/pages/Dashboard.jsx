import { ArrowLeft, Check, Rocket, Share2 } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import axios from "axios"
import { serverUrl } from '../App'

function Dashboard() {
  const [websites,setwebsites]=useState(null)
  const [loading,setloading]=useState(false)
  const [error,seterror]=useState("")
  const [copiedId,setcopiedId]=useState(null)
  const handledeploy=async(id)=>{
    try{
      const result=await axios.get(`${serverUrl}/api/website/deploy/${id}`,{withCredentials:true})
      // construct URL on client to ensure correct origin (avoid backend port)
      const slug = result.data.slug || ''
      const target = window.location.origin + '/site/' + slug
      window.open(target,"_blank")
      setwebsites((prev)=>
        prev.map((w)=>
          w._id===id?{
            ...w,deployed:true,deployedUrl:result.data.url
          }:w
        )
      )
    }
    catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
const handlegetallwebsite=async()=>{
  setloading(true)
try{
const result=await axios.get(`${serverUrl}/api/website/getall`,{withCredentials:true})
setwebsites(result.data||[])
setloading(false)
}
catch(error){
console.log(error)
seterror(error.response?.data?.message || "Failed to load websites")
setloading(false)
}
}
handlegetallwebsite()
  },[])

  const handlecopy=async(site)=>{
    if(!site?.deployedUrl) return;
    try{
      await navigator.clipboard.writeText(site.deployedUrl)
      setcopiedId(site._id)
      setTimeout(()=>setcopiedId(null),2000)
    }catch(err){
      console.error('Clipboard write failed',err)
    }
  }
    const { userData } = useSelector(state=>state.user)

    const navigate=useNavigate()
  return (
    <div className='min-h-screen bg-[#050505] text-white'>
      <div className='sticky top-0 z-40 backdrop-blur-xl bg-black/50 border-b border-white/10'>
<div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
<div className='flex items-center gap-4'>
<button className='p-2 rounded-lg hover:bg-white/10 transition ' onClick={()=>navigate("/")}><ArrowLeft size={16}></ArrowLeft></button>
<h1 className='text-lg font-semibold'>Dashboard</h1>
</div>
<button className='px-4 p-2 rounded-lg bg-white text-black text-sm font-semibold hover:scale-105 transition' onClick={()=>navigate("/generate")}>
+New Website
</button>
</div>
<div className='max-w-7xl mx-auto px-6 py-10'>
<motion.div
initial={{opacity:0,y:12}}
animate={{opacity:1,y:0}}
transition={{duration:0.3}}
className='p-8 rounded-2xl bg-[#0b0b0b] border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)]'
>
    <p className='text-sm text-zinc-400 mb-1'>Welcome Back</p>

    <h1 className='text-3xl font-bold'>{userData?.name || 'Guest'}</h1>
</motion.div>
{loading&&(
  <div className='mt-24 text-center text-zinc-400'>
    Loading Your Websites...
    </div>
)}
{error&& !loading&&(
  <div className='mt-24 text-center text-red-400'>
    {error}
    </div>
)}
{websites && websites.length === 0 && !loading && (
  <div className='mt-24 text-center text-zinc-400'>
    You have no websites
  </div>
)}
{!loading &&!error && websites?.length>0&&(
<div className='mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
  {websites.map((w,i)=>{
    const copied=copiedId===w._id
   return  <motion.div 
    key={i}
    initial={{opacity:0,y:20}}
    animate={{opacity:1,y:0}}
    transition={{delay:i*0.05}}
    whileHover={{y:-4}}
   
    className='rounded-xl bg-[#0b0b0b] border border-white/10 overflow-hidden hover:border-white/20 transition cursor-pointer flex flex-col h-full'
    >
      <div className='relative h-48 bg-black/50 overflow-hidden flex-shrink-0'>
        <iframe srcDoc={w.latestCode} className='absolute inset-0 w-full h-full scale-75 origin-top-left pointer-events-none'></iframe>
      </div>
      <div className='p-4 flex-1 flex flex-col justify-between'>
        <div>
          <h3 className='text-sm font-semibold text-white truncate'>{w.title || 'Untitled Website'}</h3>
          <p className='text-xs text-zinc-500 mt-1'>ID: {w._id.slice(-8)}</p>
          <p className='text-xs text-zinc-400 mt-2'>Last Updated: {new Date(w.updatedAt).toLocaleDateString()}</p>
          <div className='text-center'>
           <button  className='cursor-pointer "bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold transition duration-300 hover:bg-blue-700 hover:scale-105"' onClick={()=>navigate(`/editor/${w._id}`)}>View</button>
          </div>
          {!w.deployed?(
            <button onClick={()=>handledeploy(w._id)}
            className='mt-auto flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 hover:scale-105 transition'
            ><Rocket size={18}></Rocket>Deploy</button>
          ):(<motion.button

            whileTap={{scale:0.95}}
            onClick={()=>handlecopy(w)}
            className={`mt-auto flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all${copied
              ?" bg-emerald-500/20 text-emerald-400 border border-emerald-500/30":"bg-white/10 hover:bg-white/20 border border-white/10"
            }`}
          >
{copied?(
  <>
  <Check size={14}></Check>
  Link Copied
  </>
):
<>
<Share2 size={14}></Share2>
Share Link
</>}
            </motion.button>)}
        </div>
        
      </div>
    </motion.div>
})}
</div>
)}
</div>
      </div>
    </div>
  )
}

export default Dashboard
