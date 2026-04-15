import React from 'react'
import { useEffect } from 'react'
import axios from "axios"
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'
function usergetcurrent() {
  const dispatch=useDispatch()
  const getcurrentuser=async()=>{
try{
const result=await axios.get(`${serverUrl}/api/user/me`,{withCredentials:true})
dispatch(setUserData(result.data))
console.log(result)
}
catch(error){
console.error("Error fetching current user:", error.message)
}
    }
  useEffect(()=>{
    getcurrentuser()
  },[])

  return { refetch: getcurrentuser }
}

export default usergetcurrent
