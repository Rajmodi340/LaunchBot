import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { useSelector } from 'react-redux'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import {serverUrl} from "../App"
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
const PHASES=[
  "Analyzing your idea...",
  "Designing layout & structure...",
  "Writing HTML & CSS...",
  "Adding animations & interactions...",
  "Final quality checks...",
]
function Generate() {
    const { userData } = useSelector(state=>state.user)
    
        const navigate=useNavigate()
        const [prompt,setPrompt]=React.useState("")
        const [error,setError]=useState("")
        const [loading,setloading]=useState("")
        const [progress,setprogress]=useState(0)
        const [phaseindex,setphaseindex]=useState(0)
        const handlegenerate=async()=>{
          setloading(true)
          try{
const result=await axios.post(`${serverUrl}/api/website/generate`,{prompt},{withCredentials:true})
console.log(result)
setprogress(100)
setloading(false)
 navigate(`/editor/${result.data.websiteId}`)
         
          }
          catch(error){
            setloading(false)
            const errorMsg = error.response?.data?.message || error.message || "Failed to generate website. Please ensure you have enough credits and try again."
            setError(errorMsg)
            console.error("Error generating website:",error)
          }
        }
        useEffect(()=>{
          if(!loading){
setphaseindex(0)
setprogress(0)
return;
          }
          let value=0;
          let phase=0;
          const interval=setInterval(()=>{
const incre=value<20?
Math.random()*1.5:value<60
?Math.random()*1.2
:Math.random()*0.6;
value+=incre
if(value>=93)
  value=93;
phase=Math.min(
  Math.floor((value/100)*PHASES.length),PHASES.length-1
)
setprogress(Math.floor(value))
setphaseindex(phase)

          },1200)
          return ()=>clearInterval(interval)
        },[loading])
  return (
    <div className='min-h-screen bg-linear-to-br from-[#050505] via-[#0b0b0b] to-[#050505] text-white'>
      <div className='sticky top-0 z-40 backdrop-blur-xl bg-black/50 border-b border-white/10'>
<div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
<div className='flex items-center gap-4'>
<button className='p-2 rounded-lg hover:bg-white/10 transition ' onClick={()=>navigate("/")}><ArrowLeft size={16}></ArrowLeft></button>
<h1 className='text-lg font-semibold'>Launch<span className='text-blue-500'>Bot</span></h1>
</div>

</div>
<div className='max-w-7xl mx-auto px-6 py-10'>
<motion.div
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}
className='text-center mb-16'

>
<h1 className='text-3xl md:text-4xl font-bold'>Build Websites with<span className='text-blue-500'> Real AI Power</span></h1>
<p className='text-zinc-400 max-w-2xl mx-auto'>This process may take several minutes.LaunchBot focues on quality,not shortcut</p>
</motion.div>
<div className='mb-14'>
<h1 className='text-2xl font-semibold'>Describe your website</h1>
<div className='relative'>
<textarea onChange={(e)=>setPrompt(e.target.value)} value={prompt} className='w-full h-40 p-4 bg-zinc-900/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Describe your website in detail...'></textarea>

</div>
{error&&<p className='mt-4 text-sm text-red-400'>{error}</p>}
</div>
</div>
<div className='flex justify-center'>
  <motion.button
  whileHover={{scale:1.05}}
  whileTap={{scale:0.95}}
  disabled={!prompt.trim()&&loading }
className={`px-14 py-4 rounded-2xl font-semibold text-lg ${prompt.trim()&&!loading?"bg-white text-black":"bg-white/20 text-zinc-400 cursor-not-allowed"}`}
onClick={handlegenerate}
  >
Generate website
  </motion.button>
</div>
{loading&&(
  <motion.div 
initial={{opacity:0}}
animate={{opacity:1}}
className='max-w-xl mx-auto mt-12'
  >
<div className='flex justify-between mb-2 text-xs text-zinc-400'>
  <span className=''>{PHASES[phaseindex]}
    <span>
{progress}%
    </span>
  </span>

</div>
<div className='h-2 w-full bg-white/10 rounded-full overflow-hidden'>
<motion.div
className='h-full bg-linear-to-r from-white to-zinc-300'
animate={{width:`${progress}%`}}
transition={{ease:"easeOut",duration:0.8}}
>

</motion.div>
</div>
<div className='text-white font-medium'>
  <span className='text-white font-medium'>
    ~8-12minutes
  </span>
</div>
  </motion.div>
)}
      </div>
    </div>
  )
}

export default Generate
