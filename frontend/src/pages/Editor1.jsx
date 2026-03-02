import React from 'react'
import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { serverUrl } from '../App'
import axios from "axios"
import Editor from "@monaco-editor/react";
import { MessageSquare, Send, X, ArrowLeft } from 'lucide-react'
import { useRef } from 'react'
import { useState } from 'react'
import { Code2, Monitor, Rocket } from 'lucide-react'
import { AnimatePresence } from 'motion/react'
import { motion } from 'motion/react'
function Editor1() {
    const iframeRef=useRef(null)
    const {id}=useParams()
    const navigate=useNavigate()
    const [website,setwebsite]=useState(null)
    const [code,setCode]=useState("")
    const [prombt,setprombt]=useState("")
    const [message,setmessage]=useState([])
    const [error,setError]=useState(null)
    const [showchat,setshowchat]=useState(false)
    const [updateError,setUpdateError]=useState(null)
    const [inputError,setInputError]=useState(null)
    const [updateLoading,setupdateloading]=useState(false)
    const [thinkingindex,setthinkingindex]=useState(0)
    const [showCode,setShowCode]=useState(false)
    const [showfullpreview,setfullpreview]=useState(false)
    const [deployLoading,setDeployLoading]=useState(false)
    const [deployMessage,setDeployMessage]=useState("")
    const thinkingsteps=[
        "Understanding your request...",
        "Planning layout changes...",
        "Improving responsiveness...",
        "Applying animations...",
        "Finalizing update...",
    ]
    const handleDeploy=async()=>{
        setDeployLoading(true)
        setDeployMessage("")
        try{
            const result=await axios.get(`${serverUrl}/api/website/deploy/${id}`,{withCredentials:true})
            console.log(result)
            setwebsite(prev=>({...prev,deployed:true,deployedUrl:result.data.url}))
            const slug = result.data.slug || ''
            const front = window.location.origin + '/site/' + slug
            setDeployMessage("✓ Website deployed! URL: "+front)
            setTimeout(()=>{
                window.open(front, '_blank')
            }, 800)
        }
        catch(err){
            console.log(err)
            setDeployMessage("Error: "+(err.response?.data?.message || err.message))
        }
        finally{
            setDeployLoading(false)
        }
    }
    const handleupdate=async()=>{
        // prevent empty submissions
        
        if(!prombt.trim()){
            setInputError("Please enter a description of changes before submitting.");
            return;
        }
        setupdateloading(true)
        setInputError(null)
        setError(null)
        // append both messages together to guarantee correct order
        setmessage((m)=>[...m,{role:"user",content:prombt}]);
        try{
            const result=await axios.post(`${serverUrl}/api/website/update/${id}`,{prompt:prombt},{withCredentials:true})
            console.log(result)
            // push the AI response right after the user message
            setmessage((m)=>[...m,{role:"ai",content:result.data.message}]);
            setCode(result.data.code)
            setprombt("")
            setUpdateError(null)
        }
        catch(err){
            console.log(err)
            setUpdateError(err.response?.data?.message || err.message)
        }
        finally{
            setupdateloading(false)
        }
    }
    useEffect(()=>{
        if(!updateLoading)
            return ;
 const intervalId = setInterval(()=>{
setthinkingindex((i)=>(i+1)%thinkingsteps.length)
},1200)
return ()=>clearInterval(intervalId)
    },[updateLoading])
    useEffect(()=>{
const handlegetwebsite=async()=>{
    try{
        const result=await axios.get(`${serverUrl}/api/website/getbyid/${id}`, { withCredentials: true });
        console.log(result);
        setwebsite(result.data);
        setCode(result.data.latestCode)
        // ensure messages are in chronological order (some older records may have reversed order)
        const sorted = [...result.data.conversation].sort((a,b)=> new Date(a.createdAt) - new Date(b.createdAt));
        setmessage(sorted);
    }
    catch(error){
        console.log(error);
        setError(error.response?.data?.message || error.message);
    }
}
handlegetwebsite()
    },[id])
    useEffect(()=>{
        if (!website || !code) return;
        const blob=new Blob([code],{type:"text/html"});
        const url=URL.createObjectURL(blob);
        if (iframeRef.current) {
            iframeRef.current.src = url;
        }
        return () => URL.revokeObjectURL(url);
    },[code]);
    if(error){
        return(
            <div className='h-screen flex-center justify-center bg-black text-red-400'>{error}</div>
        )
    }
    if(!website){
        return(
            <div className='h-screen flex items-center bg-black text-amber-50' >
Loading...
            </div>
        )
    }
  return (
        <div className='h-screen w-screen flex bg-black text-white overflow-hidden'>
      <aside className='hidden lg:flex w-[380px] flex-col border-r border-white/10 bg-black/80'>
        <Header>
           
        </Header>
        <div className='flex-1 overflow-y-auto px-4 py-4 space-y-4'>
{message.map((m,i)=>(
    <div
        key={i}
        className={`max-w-[85%] ${
        m.role==="user"?"ml-auto":"mr-auto"}`}
        >
            <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                m.role==="user"
                ?"bg-white text-black"
                :"bg-white/5 border border-white/10 text-zinc-200"
            }`}
            >
               {m.content} 
                </div>
        </div>
))}
{updateLoading&&
<div className='max-w-[85%] mr-auto'>
    <div className='px-4 py-2.5 rounded-2xl text-xs bg-white/5 border border-white/10 text-zinc-400 italic'>
        {thinkingsteps[thinkingindex]}
    </div>
    </div>}
<div className='p-3 border-t border-white/10'>


<div className='flex flex-col gap-2 mt-100' >
    <input  placeholder='Describe Changes...'className='flex-1 resize-none rounded-2xl px-4 py-3 bg-white/5 border border-white/10 text-sm outline-none '
            onChange={(e)=>setprombt(e.target.value)}
            value={prombt} />
    <button className='px-4 py-3 rounded-2xl bg-white text-black' onClick={handleupdate} disabled={updateLoading || !prombt.trim()} ><Send size={14}></Send></button>
    {inputError && <p className='text-red-400 text-xs italic mt-1'>{inputError}</p>}
    {updateError && <p className='text-red-400 text-xs italic mt-1'>{updateError}</p>}
</div>
</div>
        </div>
      </aside>
      <div className='flex flex-1 flex-col'>
<div className='h-14 px-4 flex justify-between items-center border-b border-white/10 bg-black/80'>
<button onClick={()=>navigate('/generate')} className='p-2 hover:bg-white/10 rounded transition'>
  <ArrowLeft size={20} className='text-white' />
</button>
<span className='text-xs text-zinc-400'>Live Preview</span>

<div className='flex items-center gap-2'>
    <button className='flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-sm font-semibold hover:scale-105 transition-transform disabled:opacity-50' onClick={handleDeploy} disabled={deployLoading || website?.deployed}>
        <Rocket size={14} />
        <span className='hidden sm:inline'>{deployLoading?'Deploying...':website?.deployed?'✓ Deployed':'Deploy'}</span>
    </button>
    
    <button className="p-2 lg:hidden" onClick={()=>setshowchat(true)}>
        <MessageSquare size={18} />
    </button>
    <button className='p-2' onClick={()=>setShowCode(true)}>
        <Code2 size={18} />
    </button>
    <button className='p-2' onClick={()=>setfullpreview(true)}>
        <Monitor size={17} />
    </button>
</div>

</div>
{deployMessage && <div className={`px-4 py-2 text-sm ${deployMessage.startsWith('Error')?'bg-red-900/30 text-red-300':'bg-green-900/30 text-green-300'}`}>{deployMessage}</div>}
<iframe ref={iframeRef}  sandbox=" allow-scripts allow-same-origin allow-forms"className='flex-1 w-full bg-white'  >

</iframe>
      </div>
      <AnimatePresence>
        {showchat&&(
            <motion.div
initial={{y:"100%"}}
animate={{y:0}}
exit={{y:"100%"}}
className='fixed inset-0 z-[9999] bg-black flex flex-col'
            >
                <Header onclose={()=>setshowchat(false)}></Header>
<div className='flex-1 overflow-y-auto px-4 py-4 space-y-4'>
{message.map((m,i)=>(
    <div
        key={i}
        className={`max-w-[85%] ${
        m.role==="user"?"ml-auto":"mr-auto"}`}
        >
            <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                m.role==="user"
                ?"bg-white text-black"
                :"bg-white/5 border border-white/10 text-zinc-200"
            }`}
            >
               {m.content} 
                </div>
        </div>
))}
{updateLoading&&
<div className='max-w-[85%] mr-auto'>
    <div className='px-4 py-2.5 rounded-2xl text-xs bg-white/5 border border-white/10 text-zinc-400 italic'>
        {thinkingsteps[thinkingindex]}
    </div>
    </div>}
<div className='p-3 border-t border-white/10'>


<div className='flex flex-col gap-2 mt-100' >
    <input  placeholder='Describe Changes...'className='flex-1 resize-none rounded-2xl px-4 py-3 bg-white/5 border border-white/10 text-sm outline-none '
            onChange={(e)=>setprombt(e.target.value)}
            value={prombt} />
    <button className='px-4 py-3 rounded-2xl bg-white text-black' onClick={handleupdate} disabled={updateLoading || !prombt.trim()} ><Send size={14}></Send></button>
    {inputError && <p className='text-red-400 text-xs italic mt-1'>{inputError}</p>}
    {updateError && <p className='text-red-400 text-xs italic mt-1'>{updateError}</p>}
</div>
</div>
        </div>
            </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showCode&&(
            <motion.div
            initial={{x:"100%"}}
            animate={{x:0}}
            exit={{x:"100%"}}
            className='fixed inset-y-0 right-0 w-full lg:w-[45%] z-[9999] bg-[#1e1e1e] flex flex-col'
            >
<div className='h-12 px-4 flex justify-between items-center border-b border-white/10 bg-[#1e1e1e]'>
    <span className='text-sm font-medium'>index.html</span>
    <button onClick={()=>setShowCode(false)}><X size={18}></X></button>
</div>
<Editor
theme='vs-dark'
value={code}
language='html'
onChange={(v)=>setCode(v)}
></Editor>
            </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showfullpreview&&(
            <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            className='fixed inset-0 z-[9999] bg-black flex flex-col'
            >
<div className='h-12 px-4 flex justify-between items-center border-b border-white/10 bg-black'>
    <span className='text-sm font-medium'>Full Preview</span>
    <button onClick={()=>setfullpreview(false)}><X size={18}></X></button>
</div>
<iframe className='flex-1 w-full bg-white' srcDoc={code}  sandbox=" allow-scripts allow-same-origin allow-forms"></iframe>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
  function Header({onclose}){
    return(
        <div className='h-14 px-4 flex items-center justify-between border-b border-white/10'>
            <span className='font-semibold truncate'>{website.title}</span>
            {onclose && (
              <button onClick={onclose} className='p-2 rounded hover:bg-white/5'>
                <X size={18} className='text-white' />
              </button>
            )}
        </div>
    )
}

}


export default Editor1
