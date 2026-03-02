import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { serverUrl } from '../App'
function LiveSite() {
    const {id}=useParams()
    const [html,sethtml]=useState("null")
    const [error,seterror]=useState("")
     useEffect(()=>{
    const handlegetwebsite=async()=>{
        try{
            const result=await axios.get(`${serverUrl}/api/website/getbyslug/${id}`, { withCredentials: true });
          
           sethtml(result.data.latestCode)
           
        }
        catch(error){
            console.log(error);
           seterror("site not found")
        }
    }
    handlegetwebsite()
        },[id])

        if(error){
            return(
                <div className='h-screen flex items-center justify-center bg-black text-white'>
                    {error}
                </div>
            )
        }
        return(
            <iframe title="Live Site"srcDoc={html} className='w-screen h-screen border-none' sandbox="allow-scripts allow-same-origin allow-forms" ></iframe>
        )
  
}

export default LiveSite
