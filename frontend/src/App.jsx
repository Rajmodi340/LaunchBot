
import { BrowserRouter, Navigate } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import usergetcurrent from './hooks/usergetcurrent'
import Dashboard from './pages/Dashboard'
import { useSelector } from 'react-redux'
import Generate from './pages/Generate'
import Editor1 from './pages/Editor1'
import LiveSite from './pages/LiveSite'
import Price from './pages/Price'
export const serverUrl="https://launchbot-2.onrender.com"
function App() {
  usergetcurrent()
const {userData}=useSelector((state)=>state.user)
  return (
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
<Route path="/dashboard" element={userData?<Dashboard />:<Home></Home>} />
<Route path="/generate" element={userData?<Generate />:<Navigate to="/"></Navigate>} />
<Route path="/editor/:id" element={userData?<Editor1></Editor1>:<Home></Home>}></Route>
<Route path="/site/:id" element={<LiveSite></LiveSite>}></Route>
<Route path="/pricing" element={<Price></Price>}></Route>
  </Routes>
  </BrowserRouter>
      
  )
}

export default App
