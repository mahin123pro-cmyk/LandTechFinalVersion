import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
  import { ToastContainer, toast } from 'react-toastify';
  import { Check, Cross, Shield, X } from 'lucide-react';

function DeedVerification() {

    const navigate = useNavigate()
    const [sucess,setSuccess]=useState("")
    const[verifiedData,setVerifiedData]=useState({})
    const [deeds, setDeeds] = useState({deedId:"",ownerName: "", nid: "", district: "", upazila: "", khatianNo: "", dagNo: "", mouza: "", landArea: "", landUnit: "decimal", registrationDate: "" });
const [resDetails,setResDetails]=useState([])
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDeeds((pre) => ({ ...pre, [name]: value }))

    }


    const submitData = async () => {
        try {

            const res = await api.post("/api/deed/verification", deeds);

          if(res.status===200){
            const id=res?.data?.message
navigate(`/verification/${id}`)
          } 
         if(res.status===201){
             setDeeds({deedId:"", ownerName: "", nid: "", district: "", upazila: "", khatianNo: "", dagNo: "", mouza: "", landArea: "", landUnit: "decimal", registrationDate: "" })
           setResDetails(res?.data?.message)
           setVerifiedData(res.data?.messageVerified)
            toast.success(res?.data?.message)
         }
        }catch (error) {
            console.log(error.message)
          
            console.log(resDetails)
            toast.error(error.response.data.message)
        }
    }


    const clearData = () => {
        setDeeds({deedId:"",ownerName: "", nid: "", district: "", upazila: "", khatianNo: "", dagNo: "", mouza: "", landArea: "", landUnit: "decimal", registrationDate: "" })
    }



    return (
     <div className='w-full   bg-cover bg-gray-100 text-zinc-900   overflow-x-hidden'>

      <div className=' w-full px-4 md:px-20  '>
        
        <div>
          
          </div>   
          
          <h1 className='text-3xl mt-10 text-amber-700 mb-5 md:text-5xl font-semibold  md:font-bold mx-auto text-center'>
            Deed Verification
            
          </h1>
      
      <div className='flex flex-col md:flex-row gap-5 w-full mb-10 '>

         <div className='flex-1 p-2 text-lg md:p-9 bg-white gap-5 rounded-2xl'>
           <div className='flex flex-col gap-y-2 mb-5 '>
          <label className=''>
            Deed Id :
          </label>
          <input style={{borderWidth:1}} className='  border-zinc-300 px-4 rounded-xl py-3' type='text' placeholder='e.g. D-2018-04512' name='deedId' value={deeds.deedId} onChange={handleChange} />
        </div>
       
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
  <div>

  <h1  className={`  text-white text-3xl font-semibold py-3 ${deeds.deedId?.trim()? "text-white " :"text-gray-400"}`}>{deeds.deedId || "Deed ID"}</h1>
</div>
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
       
{/* <div className='bg-zinc-950 w-full '>

  {resDetails && resDetails.length>0 && 
<div className='bg-zinc-950 text-white p-10 flex flex-col gap-y-6'>

<div className={`bg-green-400 p-5 rounded-2xl ` }>
<h1 className='text-2xl font-black text-black'>Document Hash:</h1>
<h1 className=''>{resDetails[11].original}</h1>
  </div>


      <div className={`flex text-3xl font-bold justify-around flex-col px-4 py-3 rounded-2xl ${sucess?"bg-blue-950":"bg-red-950/50 border-l-4 border-red-700"}`}>
        <p className='text-green-400 flex flex-row justify-between font-light '>Original Owener: 
          <span className='font-medium'>{resDetails[0].originalOwnerName}</span>
          </p>
      <p className={`${resDetails[0].success ?"text-green-400":"text-red-600"} flex flex-row justify-between`}>{resDetails[0].success ?"Original Owner" :"Fake Owner" }: <span>{resDetails[0].fakeOwnerName || "Nothing"}</span></p>
      <p className='flex flex-row justify-between'>Verified: <span className={`${resDetails[0].success ?"text-green-400":"text-red-600"}`}>{resDetails[0].success?<span><Shield/> <span>Verified </span></span>:<span className='flex'><X  /><span className='text-xl'>NOt verified </span> </span>}</span></p>
      
      
       </div>


      <div className='flex text-3xl font-bold justify-around flex-col'>
        <p className='text-green-400 flex flex-row justify-between'>
         Original Owner Nid :<span>{resDetails[1].originalOwnerNid}</span>
        </p>
        <p className={`${resDetails[1].success ?"text-green-400":"text-red-600"} flex flex-row justify-between`}>{resDetails[1].success ?"Original Owner NID" :"Fake Owner NID" } : <span>{resDetails[1].fakeOwnerNid ||"Nothing"}</span></p>
        <p className='flex flex-row justify-between'>Verified: <span className={`${resDetails[1].success ?"text-green-400":"text-red-600"}`}>{String(resDetails[1].success)}</span></p>
         </div>
      
      <div className='flex text-3xl font-bold justify-around flex-col'>
        <p className='text-green-400 flex flex-row justify-between'>
         Original District :<span>{resDetails[2].originalDistrict}</span>
        </p>
        <p className={`${resDetails[2].success ?"text-green-400":"text-red-600"} flex flex-row justify-between`}>{resDetails[2].success ?"originalDistrict" :"Fake District" } : <span>{resDetails[2].fakeDistrict ||"Nothing"}</span></p>
        <p className='flex flex-row justify-between'>Verified: <span className={`${resDetails[2].success ?"text-green-400":"text-red-600"}`}>{String(resDetails[2].success)}</span></p>
         </div>

         <div className='flex text-3xl font-bold justify-around flex-col'>
        <p className='text-green-400 flex flex-row justify-between'>
         Original Upazila :<span>{resDetails[3].originalUpazila}</span>
        </p>
        <p className={`${resDetails[3].success ?"text-green-400":"text-red-600"} flex flex-row justify-between`}>{resDetails[3].success ?"Original Upazila" :"Fake Upazila" } : <span>{resDetails[2].fakeUpazila ||"Nothing"}</span></p>
        <p className='flex flex-row justify-between'>Verified: <span className={`${resDetails[3].success ?"text-green-400":"text-red-600"}`}>{String(resDetails[3].success)}</span></p>
         </div>

         <div className='flex text-3xl font-bold justify-around flex-col'>
        <p className='text-green-400 flex flex-row justify-between'>
         Original Khatian No :<span>{resDetails[4].originalkhatianNo}</span>
        </p>
        <p className={`${resDetails[1].success ?"text-green-400":"text-red-600"} flex flex-row justify-between`}>{resDetails[4].success ?"Original khatian No" :"Fake Owner NID" } : <span>{resDetails[4].fakekhatianNo ||"Nothing"}</span></p>
        <p className='flex flex-row justify-between'>Verified: <span className={`${resDetails[4].success ?"text-green-400":"text-red-600"}`}>{String(resDetails[4].success)}</span></p>
         </div>


         <div className='flex text-3xl font-bold justify-around flex-col'>
        <p className='text-green-400 flex flex-row justify-between'>
         Original Dag No :<span>{resDetails[5].originaldagNo}</span>
        </p>
        <p className={`${resDetails[5].success ?"text-green-400":"text-red-600"} flex flex-row justify-between`}>{resDetails[5].success ?"Original Dag No" :"Fake Dag No" } : <span>{resDetails[5].fakedagNo ||"Nothing"}</span></p>
        <p className='flex flex-row justify-between'>Verified: <span className={`${resDetails[5].success ?"text-green-400":"text-red-600"}`}>{String(resDetails[5].success)}</span></p>
         </div>


         <div className='flex text-3xl font-bold justify-around flex-col'>
        <p className='text-green-400 flex flex-row justify-between'>
         Original Mouza :<span>{resDetails[1].originalmouza}</span>
        </p>
        <p className={`${resDetails[6].success ?"text-green-400":"text-red-600"} flex flex-row justify-between`}>{resDetails[1].success ?"Original Mouza" :"Fake Mouza" } : <span>{resDetails[6].fakemouza ||"Nothing"}</span></p>
        <p className='flex flex-row justify-between'>Verified: <span className={`${resDetails[6].success ?"text-green-400":"text-red-600"}`}>{String(resDetails[6].success)}</span></p>
         </div>


         <div className='flex text-3xl font-bold justify-around flex-col'>
        <p className='text-green-400 flex flex-row justify-between'>
         Original Land Area :<span>{resDetails[7].originallandArea}</span>
        </p>
        <p className={`${resDetails[7].success ?"text-green-400":"text-red-600"} flex flex-row justify-between`}>{resDetails[7].success ?"Original Land Area" :"Fake Land Area" } : <span>{resDetails[7].fakelandArea ||"Nothing"}</span></p>
        <p className='flex flex-row justify-between'>Verified: <span className={`${resDetails[7].success ?"text-green-400":"text-red-600"}`}>{String(resDetails[7].success)}</span></p>
         </div>

         <div className='flex text-3xl font-bold justify-around flex-col'>
        <p className='text-green-400 flex flex-row justify-between'>
        Original land Unit :<span>{resDetails[8].originallandUnit}</span>
        </p>
        <p className={`${resDetails[8].success ?"text-green-400":"text-red-600"} flex flex-row justify-between`}>{resDetails[1].success ?"Original Land Unit" :"Fake Land Unit" } : <span>{resDetails[8].fakelandUnit ||"Nothing"}</span></p>
        <p className='flex flex-row justify-between'>Verified: <span className={`${resDetails[8].success ?"text-green-400":"text-red-600"}`}>{String(resDetails[8].success)}</span></p>
         </div>
      
      <div className='flex text-3xl font-bold justify-around flex-col'>
        <p className='text-green-400 flex flex-row justify-between'>
       Registration Date :<span>{resDetails[9].originalregistrationDate}</span>
        </p>
        <p className={`${resDetails[9].success ?"text-green-400":"text-red-600"} flex flex-row justify-between`}>{resDetails[9].success ?"Original Registration Date" :"Registration Date" } : <span>{resDetails[9].fakeregistrationDate ||"Nothing"}</span></p>
        <p className='flex flex-row justify-between'>Verified: <span className={`${resDetails[9].success ?"text-green-400":"text-red-600"}`}>{String(resDetails[9].success)}</span></p>
         </div>
         
  
       </div>
       
       }

</div>
   */}


  {
    resDetails && resDetails.length>0 && <div className='bg-zinc-950  text-amber-50 w-full  px-4 md:px-20 py-8'>
<div className='w-full'>
  
    <div>
      <h1 className='text-3xl font-semibold text-white '>Verification Result</h1>
      <p className='text-gray-400'>Submitted document compared with the registered record.</p>
      <div className=' rounded-2xl flex gap-x-5'>
       <p className='text-green-500 border-green-400 border-2 bg-green-600/25 flex px-2 py-1 rounded-2xl items-center font-sw'><Check className=' size-5 '   /><span>{(verifiedData.verified)}  verified</span></p>
      
       <p className='text-red-500 border-red-400 border-2 bg-red-600/25 flex px-2 py-1 rounded-2xl items-center'><X className=' size-5 '   /><span>{String(verifiedData.unverified)}  Unverified</span></p>
      
      
      </div>
    </div>
    <div className='w-full bg-blue-800/20 px-2 py-5 rounded-2xl my-5 border-green-400 border-2'>

     <p className='text-xl '>Document Hash</p>
     <p className='text-green-400 overflow-auto  '>4a20b4e5264fef2ceabed51dfe47749cc58f91444ce29b85e93e7853c03ac6b1</p>
    </div>
    <div className='flex flex-col gap-6'>
      <div>
         {resDetails[0]?.success ?<div className='flex justify-between bg-blue-500/30 p-5 border-l-4 rounded-2xl border-l-green-400'>
      <div>
        <p className='text-sm text-gray-400'>Owner</p>
        <p className='text-2xl font-medium'>{resDetails[0]?.originalOwnerName}</p>
      </div>
  
       <div>
   <p className='text-green-400 border-green-400 border-2 font-bold bg-green-600/25 flex px-2 py-1 rounded-2xl items-center'><Check className=' size-5 '   /><span>verified</span></p>
     
        </div>
    
    </div>: <div className='flex justify-between bg-red-400/30 p-5 border-l-4 rounded-2xl border-l-red-500'>
      <div>
        <p className='text-sm text-gray-400'>
          Owner
        </p>
        <p className='text-2xl font-medium'>
         {resDetails[0]?.originalOwnerName}  <span className='text-sm text-gray-400'>registered</span>
        </p>
        <p className='text-2xl font-medium'>
          {resDetails[0]?.fakeOwnerName} <span className='text-sm text-gray-400'>submitted</span>
        </p>
      </div>
    <div>
  <p className='text-red-600 flex-row items-start flex-nowrap border-red-400 border-2  font-bold bg-red-600/25 flex px-2 py-1 rounded-2xl md:items-center'>
        <X  className=' size-5 ' /><span className='text-nowrap'>Not verified</span>
      </p>


      </div>
    </div> }   

   
      </div>



 <div>
         {resDetails[1]?.success ?<div className='flex justify-between bg-blue-500/30 p-5 border-l-4 rounded-2xl border-l-green-400'>
      <div>
        <p className='text-sm text-gray-400'>NID</p>
        <p className='text-2xl font-medium'>{resDetails[1]?.originalOwnerNid}</p>
      </div>
  
       <div>
   <p className='text-green-400 border-green-400 border-2 font-bold bg-green-600/25 flex px-2 py-1 rounded-2xl items-center'><Check className=' size-5 '   /><span>verified</span></p>
     
        </div>
    
    </div>: <div className='flex justify-between bg-red-400/30 p-5 border-l-4 rounded-2xl border-l-red-500'>
      <div>
        <p className='text-sm text-gray-400'>
          NID
        </p>
        <p className='text-2xl font-medium'>
         {resDetails[1]?.originalOwnerNid}  <span className='text-sm text-gray-400'>registered</span>
        </p>
        <p className='text-2xl font-medium'>
          {resDetails[1]?.fakeOwnerNid} <span className='text-sm text-gray-400'>submitted</span>
        </p>
      </div>
    <div>
  <p className='text-red-600 border-red-400 border-2 flex-row items-start flex-nowrap  font-bold bg-red-600/25 flex px-2 py-1 rounded-2xl md:items-center'>
        <X  className=' size-5 ' /><span className='text-nowrap'>Not verified</span>
      </p>


      </div>
    </div> }   

   
      </div>





       <div>
         {resDetails[2]?.success ?<div className='flex justify-between bg-blue-500/30 p-5 border-l-4 rounded-2xl border-l-green-400'>
      <div>
        <p className='text-sm text-gray-400'>District</p>
        <p className='text-2xl font-medium'>{resDetails[2]?.originalDistrict}</p>
      </div>
  
       <div>
   <p className='border-green-400 border-2 text-green-400 font-bold bg-green-600/25 flex px-2 py-1 rounded-2xl items-center'><Check className=' size-5 '   /><span>verified</span></p>
     
        </div>
    
    </div>: <div className='flex justify-between bg-red-400/30 p-5 border-l-4 rounded-2xl border-l-red-500'>
      <div>
        <p className='text-sm text-gray-400'>
          District
        </p>
        <p className='text-2xl font-medium'>
         {resDetails[2]?.originalDistrict}  <span className='text-sm text-gray-400'>registered</span>
        </p>
        <p className='text-2xl font-medium'>
          {resDetails[2]?.fakeDistrict} <span className='text-sm text-gray-400'>submitted</span>
        </p>
      </div>
    <div>
  <p className='border-red-400 border-2 text-red-600 flex-row items-start flex-nowrap  font-bold bg-red-600/25 flex px-2 py-1 rounded-2xl md:items-center'>
        <X  className=' size-5 ' /><span className='text-nowrap'>Not verified</span>
      </p>


      </div>
    </div> }   

   
      </div>





       <div>
         {resDetails[3]?.success ?<div className='flex justify-between bg-blue-500/30 p-5 border-l-4 rounded-2xl border-l-green-400'>
      <div>
        <p className='text-sm text-gray-400'>Upazila</p>
        <p className='text-2xl font-medium'>{resDetails[3]?.originalUpazila}</p>
      </div>
  
       <div>
   <p className= 'border-green-400 border-2 text-green-400 font-bold bg-green-600/25 flex px-2 py-1 rounded-2xl items-center'><Check className=' size-5 '   /><span>verified</span></p>
     
        </div>
    
    </div>: <div className='flex justify-between bg-red-400/30 p-5 border-l-4 rounded-2xl border-l-red-500'>
      <div>
        <p className='text-sm text-gray-400'>
          Upazila
        </p>
        <p className='text-2xl font-medium'>
         {resDetails[3]?.originalUpazila}  <span className='text-sm text-gray-400'>registered</span>
        </p>
        <p className='text-2xl font-medium'>
          {resDetails[3]?.fakeUpazila} <span className='text-sm text-gray-400'>submitted</span>
        </p>
      </div>
    <div>
  <p className='text-red-600 border-red-400 border-2 flex-row items-start flex-nowrap  font-bold bg-red-600/25 flex px-2 py-1 rounded-2xl md:items-center'>
        <X  className=' size-5 ' /><span className='text-nowrap'>Not verified</span>
      </p>


      </div>
    </div> }   

   
      </div>



       <div>
         {resDetails[4]?.success ?<div className='flex justify-between bg-blue-500/30 p-5 border-l-4 rounded-2xl border-l-green-400'>
      <div>
        <p className='text-sm text-gray-400'>Khatian No</p>
        <p className='text-2xl font-medium'>{resDetails[4]?.originalkhatianNo}</p>
      </div>
  
       <div>
   <p className=' border-green-400 border-2 text-green-400 font-bold bg-green-600/25 flex px-2 py-1 rounded-2xl items-center'><Check className=' size-5 '   /><span>verified</span></p>
     
        </div>
    
    </div>: <div className='flex justify-between bg-red-400/30 p-5 border-l-4 rounded-2xl border-l-red-500'>
      <div>
        <p className='text-sm text-gray-400'>
          Khatian No
        </p>
        <p className='text-2xl font-medium'>
         {resDetails[4]?.originalkhatianNo}  <span className='text-sm text-gray-400'>registered</span>
        </p>
        <p className='text-2xl font-medium'>
          {resDetails[4]?.fakekhatianNo} <span className='text-sm text-gray-400'>submitted</span>
        </p>
      </div>
    <div>
  <p className='border-red-400 border-2 text-red-600 flex-row items-start flex-nowrap  font-bold bg-red-600/25 flex px-2 py-1 rounded-2xl md:items-center'>
        <X  className=' size-5 ' /><span className='text-nowrap'>Not verified</span>
      </p>


      </div>
    </div> }   

   
      </div>




       <div>
         {resDetails[5]?.success ?<div className='flex justify-between bg-blue-500/30 p-5 border-l-4 rounded-2xl border-l-green-400'>
      <div>
        <p className='text-sm text-gray-400'>Dag No</p>
        <p className='text-2xl font-medium'>{resDetails[5]?.originaldagNo}</p>
      </div>
  
       <div>
   <p className='border-green-400 border-2 text-green-400 font-bold bg-green-600/25 flex px-2 py-1 rounded-2xl items-center'><Check className=' size-5 '   /><span>verified</span></p>
     
        </div>
    
    </div>: <div className='flex justify-between bg-red-400/30 p-5 border-l-4 rounded-2xl border-l-red-500'>
      <div>
        <p className='text-sm text-gray-400'>
          Dag No
        </p>
        <p className='text-2xl font-medium'>
         {resDetails[5]?.originaldagNo}  <span className='text-sm text-gray-400'>registered</span>
        </p>
        <p className='text-2xl font-medium'>
          {resDetails[5]?.fakedagNo} <span className='text-sm text-gray-400'>submitted</span>
        </p>
      </div>
    <div>
  <p className='text-red-600 border-red-400 border-2 flex-row items-start flex-nowrap  font-bold bg-red-600/25 flex px-2 py-1 rounded-2xl md:items-center'>
        <X  className=' size-5 ' /><span className='text-nowrap'>Not verified</span>
      </p>


      </div>
    </div> }   

   
      </div>




       <div>
         {resDetails[6]?.success ?<div className='flex justify-between bg-blue-500/30 p-5 border-l-4 rounded-2xl border-l-green-400'>
      <div>
        <p className='text-sm text-gray-400'>Mouza</p>
        <p className='text-2xl font-medium'>{resDetails[6]?.originalmouza}</p>
      </div>
  
       <div>
   <p className='text-green-400 border-green-400 border-2 font-bold bg-green-600/25 flex px-2 py-1 rounded-2xl items-center'><Check className=' size-5 '   /><span>verified</span></p>
     
        </div>
    
    </div>: <div className='flex justify-between bg-red-400/30 p-5 border-l-4 rounded-2xl border-l-red-500'>
      <div>
        <p className='text-sm text-gray-400'>
         Mouza
        </p>
        <p className='text-2xl font-medium'>
         {resDetails[6]?.originalmouza}  <span className='text-sm text-gray-400'>registered</span>
        </p>
        <p className='text-2xl font-medium'>
          {resDetails[6]?.fakemouza} <span className='text-sm text-gray-400'>submitted</span>
        </p>
      </div>
    <div>
  <p className='text-red-600 border-red-400 border-2 flex-row items-start flex-nowrap  font-bold bg-red-600/25 flex px-2 py-1 rounded-2xl md:items-center'>
        <X  className=' size-5 ' /><span className='text-nowrap'>Not verified</span>
      </p>


      </div>
    </div> }   

   
      </div>



      
            <div>
         {resDetails[7]?.success ?<div className='flex justify-between bg-blue-500/30 p-5 border-l-4 rounded-2xl border-l-green-400'>
      <div>
        <p className='text-sm text-gray-400'>Land Area</p>
        <p className='text-2xl font-medium'>{resDetails[7]?.originallandArea}</p>
      </div>
  
       <div>
   <p className='text-green-400 border-green-400 border-2 font-bold bg-green-600/25 flex px-2 py-1 rounded-2xl items-center'><Check className=' size-5 '   /><span>verified</span></p>
     
        </div>
    
    </div>: <div className='flex justify-between bg-red-400/30 p-5 border-l-4 rounded-2xl border-l-red-500'>
      <div>
        <p className='text-sm text-gray-400'>
        Land Area
        </p>
        <p className='text-2xl font-medium'>
         {resDetails[7]?.originallandArea}  <span className='text-sm text-gray-400'>registered</span>
        </p>
        <p className='text-2xl font-medium'>
          {resDetails[7]?.fakelandArea} <span className='text-sm text-gray-400'>submitted</span>
        </p>
      </div>
    <div>
  <p className='text-red-600 border-red-400 border-2 flex-row items-start flex-nowrap  font-bold bg-red-600/25 flex px-2 py-1 rounded-2xl md:items-center'>
        <X  className=' size-5 ' /><span className='text-nowrap'>Not verified</span>
      </p>


      </div>
    </div> }   

   
      </div>





            <div>
         {resDetails[8]?.success ?<div className='flex justify-between bg-blue-500/30 p-5 border-l-4 rounded-2xl border-l-green-400'>
      <div>
        <p className='text-sm text-gray-400'>Unit</p>
        <p className='text-2xl font-medium'>{resDetails[8]?.originallandUnit}</p>
      </div>
  
       <div>
   <p className='text-green-400 border-green-400 border-2 font-bold bg-green-600/25 flex px-2 py-1 rounded-2xl items-center'><Check className=' size-5 '   /><span>verified</span></p>
     
        </div>
    
    </div>: <div className='flex justify-between bg-red-400/30 p-5 border-l-4 rounded-2xl border-l-red-500'>
      <div>
        <p className='text-sm text-gray-400'>
         Unit
        </p>
        <p className='text-2xl font-medium'>
         {resDetails[8]?.originallandUnit}  <span className='text-sm text-gray-400'>registered</span>
        </p>
        <p className='text-2xl font-medium'>
          {resDetails[8]?.fakelandUnit} <span className='text-sm text-gray-400'>submitted</span>
        </p>
      </div>
    <div>
  <p className='text-red-600 border-red-400 border-2 flex-row items-start flex-nowrap  font-bold bg-red-600/25 flex px-2 py-1 rounded-2xl md:items-center'>
        <X  className=' size-5 ' /><span className='text-nowrap'>Not verified</span>
      </p>


      </div>
    </div> }   

   
      </div>





            <div>
         {resDetails[9]?.success ?<div className='flex justify-between bg-blue-500/30 p-5 border-l-4 rounded-2xl border-l-green-400'>
      <div>
        <p className='text-sm text-gray-400'>Date</p>
        <p className='text-2xl font-medium'>{resDetails[9]?.originalregistrationDate}</p>
      </div>
  
       <div>
   <p className='text-green-400 border-green-400 border-2 font-bold bg-green-600/25 flex px-2 py-1 rounded-2xl items-center'><Check className=' size-5 '   /><span>verified</span></p>
     
        </div>
    
    </div>: <div className='flex justify-between bg-red-400/30 p-5 border-l-4 rounded-2xl border-l-red-500'>
      <div>
        <p className='text-sm text-gray-400'>
         Mouza
        </p>
        <p className='text-2xl font-medium'>
         {resDetails[9]?.originalregistrationDate}  <span className='text-sm text-gray-400'>registered</span>
        </p>
        <p className='text-2xl font-medium'>
          {resDetails[9]?.fakeregistrationDate} <span className='text-sm text-gray-400'>submitted</span>
        </p>
      </div>
    <div>
  <p className='text-red-600 flex-row border-red-400 border-2 items-start flex-nowrap  font-bold bg-red-600/25 flex px-2 py-1 rounded-2xl md:items-center'>
        <X  className=' size-5 ' /><span className='text-nowrap'>Not verified</span>
      </p>


      </div>
    </div> }   

   
      </div>

     



    </div>

</div>

   </div>
  }

    </div>
    )
}

export default DeedVerification

