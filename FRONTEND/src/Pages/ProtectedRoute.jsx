import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import React, { useState } from 'react'
import logos from "../assets/logos.png"
import { PanelRightOpen } from "lucide-react";


export default function ProtectedRoute() {
  const navigate=useNavigate()
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  const [show,setShow]=useState(false)
  const handleshow=()=>{
setShow(!show)
  }

const handleLogOut=()=>{
  localStorage.removeItem("token")
  navigate("/")
}
  return(
<div>
   <nav className='flex  justify-between px-4 md:justify-between items-center md:px-10  left-0 right-0 bg-amber-300 z-10 md:p-4'>

        <div className=' flex  items-center gap-x-7'>

          <div className=' flex items-center'><img src={logos} className='w-14' /><span className='font-bold text-xl text-blue-950 md:text-4xl'>VUMI</span></div>

        
        </div>




        <div className='hidden md:flex items-center  gap-x-5 '>
          
            <ul className='flex text-lg text-nowrap md:text-2xl font-semibold gap-x-4 text-blue-950'>
              <Link to="/">Home</Link>
              <Link to="/admin/transfer" className='text-black'>Transfer Deed</Link>
              <Link to="/admin/deedgenerate">Deed Generate</Link>
              
            </ul>
          
          {/* <button className='hidden bg-green-700 cursor-pointer md:flex rounded items-center px-2 py-1 text-sm md:p-3' onClick={verificationNavigate}><FileText size={15} className='text-white text-sm' /> <span className='text-white'>Verify a Document</span></button> */}

        </div>
        <div className='md:hidden'>
          <PanelRightOpen onClick={handleshow} />
        </div>
        <div className="hidden md:block cursor-pointer bg-blue-950 text-white px-3 py-1 rounded-2xl font-semibold"><button className="cursor-pointer" onClick={handleLogOut}>Logout</button></div>
      </nav>

      <div
        className={`md:hidden text-2xl fixed inset-0 z-50 flex h-full w-full flex-col items-center justify-center gap-5 bg-blue-950 text-amber-100 transition-transform duration-300 ${
          show ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={handleshow}
          className="absolute right-5 top-5 text-white"
        >
          Close ✕
        </button>
      <Link to="/" onClick={() => setShow(false)}>Home</Link>
        <Link to="/admin/transfer" onClick={() => setShow(false)}>
          Transfer Deed
        </Link>
      
        <Link to="/admin/deedgenerate" onClick={() => setShow(false)}>
          Deed Generate
        </Link>
        <button onClick={handleLogOut}>Logout</button>
      </div>
<Outlet />;

</div>
  )  
  
}