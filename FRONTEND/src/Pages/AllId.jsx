import React, { useEffect, useState } from 'react'
import { api } from '../utils/api'
import { useNavigate } from 'react-router-dom'

function AllId() {
    const [id,setId]=useState([])
    const navigate=useNavigate()
    useEffect(()=>{
        const getID=async()=>{
           const res= await api.get("/api/deed/allid")
           setId(res?.data?.message)
        }
        getID()
    },[])
    const handeleNevigate=(e)=>{
navigate(`/verification/${e}`)
    }
  return (
    <div className='text-white'>
      <h1 className='text-3xl text-center font-bold my-5 text-blue-950'>All ID </h1>
    {id &&<div className='flex flex-col  gap-y-5 rounded-2xl'>
        {id.map((e,index)=>{
            return<div key={index} className='bg-blue-700 p-5'>
                <h2>Id:</h2>
                <h2>{e.deedId}</h2>
                <button className='cursor-pointer px-3 bg-blue-950 text-white rounded py-2' onClick={()=>handeleNevigate(e.deedId)}>Show Details</button>
                </div>
        })}
      </div>
    
    } 
    </div>
  )
}

export default AllId
