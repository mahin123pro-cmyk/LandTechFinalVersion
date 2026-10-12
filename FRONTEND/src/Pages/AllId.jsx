import React, { useEffect, useState } from 'react'
import { api } from '../utils/api'

function AllId() {
    const [id,setId]=useState([])
    useEffect(()=>{
        const getID=async()=>{
           const res= await api.get("/api/deed/allid")
           setId(res?.data?.message)
        }
        getID()
    },[])
  return (
    <div>
      <h1>All ID </h1>
    {id &&<div className='flex flex-col  gap-y-5'>
        {id.map((e,index)=>{
            return<div key={index} className='bg-amber-300 p-5'>
                <h2>Id:</h2>
                <h2>{e.deedId}</h2>
                </div>
        })}
      </div>
    
    } 
    </div>
  )
}

export default AllId
