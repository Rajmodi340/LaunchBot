import React from 'react'
import {AnimatePresence, motion} from"motion/react"
import { signInWithPopup } from "firebase/auth";
import {auth, provider} from "../firebase"
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice';
import axios from "axios"
import {serverUrl} from "../App"
function Loginmodel({open,onclose}) {
  const dispatch=useDispatch()
    const handleGoogleAuth=async()=>{
        try{
const result=await signInWithPopup(auth, provider)
const {data}=await axios.post(`${serverUrl}/api/auth/google`, {
  name:result.user.displayName,
  email:result.user.email,
  avatar:result.user.photoURL,
},{withCredentials:true,
})
dispatch(setUserData(data.user))
onclose()
        }
        catch(error){
            console.error("Error signing in with Google:", error);
        }

    }
  return (
    <AnimatePresence>
    {open && <motion.div 
    className="fixed inset-0 z-100 flex items-center justify-center bg-black/80
    backdrop-blur-xl px-4"
    initial={{opacity:0}}
    animate={{opacity:1}}
    exit={{opacity:0}}
    onClick={(onclose)}
    >
        <motion.div
        initial={{scale:0.88,opacity:0,y:60}}
        animate={{scale:1,opacity:1,y:0}}
        exit={{scale:0.88,opacity:0,y:60}}
        transition={{duration:0.3,ease:"easeOut"}}
        className='relative w-full max-w-md p-[1px] rounded-3xl bg-gradient-to-br from-purple-500/40 via-blue-500/30 to-transparent'
        onClick={(e)=>e.stopPropagation()}
        >
          <div className='relative rounded-3xl bg-[#0b0b0b] border border-white/10 shadow-[0-30px_120px_rgba(0,0,0,0.8)] overflow-hidden'>
          <motion.div

          animate={{ opacity:[0.25,0.4,0.25]}}
          transition={{duration:6, repeat:Infinity}}
          className='p-8 absolute -top-32 -left-32 w-80 h-80 bg-purple-500/20 rounded-full'>

          </motion.div>
          <motion.div
            animate={{ opacity:[0.25,0.4,0.25]}}
            transition={{duration:6, repeat:Infinity, delay:1}}
            className='p-8 absolute -bottom-32 -right-32 w-80 h-80 bg-blue-500/20 rounded-full'>
                
          </motion.div>
          <button
          className='absolute top-5 right-5 z-20 text-zinc-400 hover:text-white transition text-lg'
          onClick={onclose}>
            X
          </button>
          <div className='relative px-8 pt-14 pb-10 text-center'>
            <h1 className='inline-block mb-6 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300'>
AI-powered website
            </h1>
            <h2 className='text-3xl font-semibold leading-tight mb-3 space-x-2'>
                <span className=''>Welcome to</span>
                <span className='text-purple-400'>AI Builder</span>

            </h2>
            <motion.button
            whileHover={{scale:1.04}}
            whileTap={{scale:0.96}}
            onClick={handleGoogleAuth}
            className="group relative w-full h-13 rounded-xl bg-white text-black font-semibold shadow-xl overflow-hidden"
            >
                <div className='relative flex items-center justify-center gap-3'>
                  <span className='sr-only'>Google</span>
                  <svg className='w-6 h-6' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg' aria-hidden='true'>
                    <path fill='#4285F4' d='M24 9.5c3.54 0 6.36 1.22 8.26 2.23l6.04-6.03C35.8 3.16 30.2 1.5 24 1.5 14.9 1.5 6.92 6.96 3.5 14.5l7.96 6.2C12.7 14.2 17.8 9.5 24 9.5z'/>
                    <path fill='#34A853' d='M46.5 24c0-1.59-.15-3.12-.44-4.58H24v8.7h12.84c-.55 3-2.54 5.54-5.42 7.24l8.27 6.42C43.98 37.6 46.5 31.2 46.5 24z'/>
                    <path fill='#FBBC05' d='M11.46 29.7A14.99 14.99 0 0 1 11 24c0-1.6.26-3.14.73-4.6L3.77 13.2A23.99 23.99 0 0 0 0 24c0 3.9.93 7.6 2.57 10.9l8.89-5.2z'/>
                    <path fill='#EA4335' d='M24 46.5c6.2 0 11.8-1.66 15.86-4.52l-7.56-5.88C30.38 37.7 27.6 38.5 24 38.5c-6.2 0-11.3-4.7-12.55-10.9l-8 5.56C6.92 41.54 14.9 46.5 24 46.5z'/>
                  </svg>
                  <span>Continue with Google</span>
                </div>
               
            </motion.button>
            <div className='flex-items-center gap-4 my-10'>
<div className='h-px flex-1 bg-white/10'>
           
            <span className='text-xs text-zinc-500 tracking-wide'>Secure Login</span>
            </div>
             </div>
             <p className='text-xs text-zinc-500 tracking-wide'>
                By continuing, you agree to our <span className='text-purple-400'>Terms of Service</span> and acknowledge that you have read our <span className='text-purple-400'>Privacy Policy</span>.
             </p>
          </div>
          </div> 
        </motion.div>
        </motion.div>}
    </AnimatePresence>
  )
}

export default Loginmodel
