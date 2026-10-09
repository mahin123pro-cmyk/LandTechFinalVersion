import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';

function DeedGeneratePage() {

    const navigate = useNavigate()
    const [sucess,setSuccess]=useState("")
    const [deeds, setDeeds] = useState({ ownerName: "", nid: "", district: "", upazila: "", khatianNo: "", dagNo: "", mouza: "", landArea: "", landUnit: "decimal", registrationDate: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDeeds((pre) => ({ ...pre, [name]: value }))

    }


    const submitData = async () => {
        try {

            const res = await api.post("/api/deed/newdeedgenerate", deeds);

            console.log(res)
            setDeeds({ ownerName: "", nid: "", district: "", upazila: "", khatianNo: "", dagNo: "", mouza: "", landArea: "", landUnit: "decimal", registrationDate: "" })
          setSuccess(res?.data?.message2)
        }catch (error) {
            console.log(error.message)
        }
    }


    const clearData = () => {
        setDeeds({ ownerName: "", nid: "", district: "", upazila: "", khatianNo: "", dagNo: "", mouza: "", landArea: "", landUnit: "decimal", registrationDate: "" })
    }



    return (
     <div className='w-full px-4  bg-cover bg-gray-100 text-zinc-900  md:px-20 overflow-x-hidden'>

      <div className=' w-full   '>
        
        <div>
          
          </div>   
          
          <h1 className='text-3xl mt-10 mb-5 md:text-5xl font-semibold  md:font-bold mx-auto text-center'>
            Make a land record
          </h1>
      
      <div className='flex flex-col md:flex-row gap-5 w-full mb-10 '>

         <div className='flex-1 p-2 text-lg md:p-9 bg-white gap-5 rounded-2xl'>
       
           <div  className='flex flex-col gap-y-2 mb-5'>
             <label>
              Owner Name :
             </label>
             <input style={{borderWidth:1}} className=' border-zinc-300 px-4 rounded-xl py-3' type='text' placeholder='Full name as on the deed' name='ownerName' value={deeds.ownerName} onChange={handleChange} />
            </div>


    <div className='flex flex-col gap-y-2 mb-5 '>
          <label className=''>
            Owner NId No :
          </label>
          <input style={{borderWidth:1}} className='  border-zinc-300 px-4 rounded-xl py-3' type='text' placeholder='e.g. 390309949' name='nid' value={deeds.nid} onChange={handleChange} />
        </div>


<div className='flex flex-col gap-y-2 mb-5 '>
          <label className=''>
            District :
          </label>
          <input style={{borderWidth:1}} className='  border-zinc-300 px-4 rounded-xl py-3' type='text' placeholder='Dhaka' name='district' value={deeds.district} onChange={handleChange} />
        </div>


        <div className='flex flex-col gap-y-2 mb-5 '>
          <label className=''>
           upazila :
          </label>
          <input style={{borderWidth:1}} className='  border-zinc-300 px-4 rounded-xl py-3' type='text' placeholder='Teknaf' name='upazila' value={deeds.upazila} onChange={handleChange} />
        </div>




          <div className='flex flex-col md:flex-row md:justify-between gap-3 gap-y-2 mb-5'>

      <div>
            <label>
              Khatian No :

            </label>
            <input style={{borderWidth:1}} className='w-full  border-zinc-300 px-4  rounded-xl py-3' type='text' placeholder='Enter Khatian' name='khatianNo' value={deeds.khatianNo} onChange={handleChange} />
          </div>
          <div>
            <label>
              Dag No :
            </label>
            <input style={{borderWidth:1}}  className='w-full   border-zinc-300 px-4 rounded-xl py-3' type='text' placeholder='Enter Dag No' name='dagNo' value={deeds.dagNo} onChange={handleChange} />
          </div>
          <div>
            <label>
              Mouza :
            </label>
            <input style={{borderWidth:1}} className=' w-full  border-zinc-300 px-4 rounded-xl py-3' type='text' placeholder='Enter Mouza' name='mouza' value={deeds.mouza} onChange={handleChange} />
          </div>


          </div>
         
<div className='flex flex-col gap-y-3 md:flex-row md:justify-between '>
<div className='flex'>



             <div className='flex flex-col'>
            <label>
              Land Area :
            </label>
   <div>
             <input  style={{borderWidth:1}} className='  border-zinc-300 px-4 rounded-xl py-3'  type='number' placeholder='Enter Land Area' name='landArea' value={deeds.landArea} onChange={handleChange} />
          
               <select value={deeds.landUnit} name='landUnit' onChange={handleChange} className='bg-blue-950 text-white py-3 rounded-r-lg border-2 px-5'>
              <option value="decimal">Decimal</option>
              <option value="katha">Katha</option>
              <option value="bigha">Bigha</option>
              <option value="acre">Acre</option>
              <option value="hectare">Hactare</option>
              <option value="sqm">Square</option>
            </select></div>   
          
          </div>
    
          </div>
          <div className='flex flex-col'>
            <label>Registration Date</label>
            <input className='text-blue-950 font-semibold' name='registrationDate' type='date' value={deeds.registrationDate} onChange={handleChange} />


          </div>
</div>
          

        <div className='w-full text-center space-x-3.5 mt-6'>


<button   onClick={clearData} className='bg-gray-200 rounded px-5 py-2 font-semibold hover:bg-orange-500 cursor-pointer transition-colors duration-1000'>Clear Form</button>

        </div>
        </div>
        <div className='bg-blue-950 rounded-2xl w-full flex-1 text-white p-5 self-start h-fit'>
          <div>
            <h1 className='text-white text-3xl font-semibold py-8'>Record preview</h1>
            <h1></h1>
          </div>

<div>
  <div className='flex justify-between  py-2 border-gray-400 border-dashed' style={{borderTopWidth:1}} ><h1>Owner</h1>
  <h1 className={deeds.ownerName?.trim()? "text-white" :"text-gray-400 text-sm"}>{deeds.ownerName ||"Not entered yet"}</h1>
  </div>

<div className='flex justify-between  py-2 border-gray-400 border-dashed' style={{borderTopWidth:1}} ><h1>Owner NID :</h1>
  <h1 className={deeds.nid?.trim()? "text-white" :"text-gray-400 text-sm"}>{deeds.nid ||"Not entered yet"}</h1>
  </div>

   <div className='flex justify-between  py-2 border-gray-400 border-dashed' style={{borderTopWidth:1}} ><h1>District</h1>
  <h1 className={deeds.district?.trim()? "text-white" :"text-gray-400 text-sm"}>{deeds.district ||"Not entered yet"}</h1>
  </div>


   <div className='flex justify-between  py-2 border-gray-400 border-dashed' style={{borderTopWidth:1}} ><h1>Upazila</h1>
  <h1 className={deeds.upazila?.trim()? "text-white" :"text-gray-400 text-sm"}>{deeds.upazila ||"Not entered yet"}</h1>
  </div>


  <div className='flex justify-between  py-2 border-gray-400 border-dashed' style={{borderTopWidth:1}}>
    <h1  >
Khatian No
    </h1>
    <h1 className={deeds.khatianNo?.trim()? "text-white" :"text-gray-400 text-sm"}>
      {deeds.khatianNo || "Not entered yet"} 
    </h1>
  </div>

  <div className='flex justify-between  py-2 border-gray-400 border-dashed' style={{borderTopWidth:1}}>
    <h1>
Dag No :
    </h1>
    <h1 className={deeds.dagNo?.trim()? "text-white" :"text-gray-400 text-sm"}>
{deeds.dagNo || "Not entered yet"}
    </h1>
  </div>


  <div className='flex justify-between  py-2 border-gray-400 border-dashed' style={{borderTopWidth:1}}>
    <h1>
Mouza :
    </h1>
    <h1  className={deeds.mouza?.trim()? "text-white" :"text-gray-400 text-sm"}>
      {deeds.mouza || "Not entered yet"}
    </h1>
  </div>


  <div className='flex justify-between  py-2 border-gray-400 border-dashed' style={{borderTopWidth:1}}>
    <h1>
Land Area :
    </h1>
    <h1   className={deeds.landArea?.trim()? "text-white" :"text-gray-400 text-sm"}>
      {deeds.landArea || "Not entered yet"}
    </h1>
  </div>


  <div className='flex justify-between  py-2 border-gray-400 border-dashed' style={{borderTopWidth:1}}>
    <h1>
landUnit :
    </h1>
    <h1  className={deeds.landUnit?.trim()? "text-white" :"text-gray-400 text-sm"}>
      {deeds.landUnit || "Not entered yet"}
    </h1>
  </div>

  <div className='flex justify-between  py-2 border-gray-400 border-dashed' style={{borderTopWidth:1,borderBottomWidth:1}}>
    <h1>
Registration Date :
    </h1>
    <h1    className={deeds.registrationDate?.trim()? "text-white" :"text-gray-400 text-sm"}>
      {deeds.registrationDate || "Not entered yet"}
    </h1>
  </div>

  
  
</div>
      <div className='w-full text-center mt-10'>
      
         <button onClick={submitData} className='bg-white text-blue-950 rounded px-5 py-2 font-semibold hover:bg-orange-500 cursor-pointer transition-colors duration-1000'>Submit </button>
       
        </div>  
       
        </div>


      </div>
      </div>
       

  

    </div>
    )
}

export default DeedGeneratePage
