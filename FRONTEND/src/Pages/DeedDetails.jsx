import { BadgeCheck, CalendarCheck, Check, Database, FilePlusCorner, FileText, Houses, Link2, MapPinCheck, MapPinSearch, Navigation2, Ruler } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import QRcode from './QRcode'
import { useParams } from 'react-router-dom'
import { api } from '../utils/api'
import GeneratePdf from './GeneratePdf'

function DeedDetails() {
  const { id } = useParams()
  const [ownerDetails, setOwnerDetails] = useState(null);
  const [detailsForPdf,setDetailsForpdf] = useState({name:"",nid:"",district:"",upazila:"",mouza:"",khatianNo:"",hash:""})
const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = async () => {
      try {
        const res = await api.post(`/api/deed/verification/${id}`)
       
        setOwnerDetails(res?.data?.message)
 setDetailsForpdf({
        name: res?.data?.message.currentOwner?.name ?? "",
        nid: res?.data?.message.currentOwner?.nid ?? "",
        district: res?.data?.message.district ?? "",
        upazila: res?.data?.message.upazila ?? "",
        mouza:res?.data?.message.mouza ?? "",
        khatianNo: res?.data?.message.khatianNo ?? "",
        hash: res?.data?.message.documentHash ?? ""
      });
      } catch (error) {
        setOwnerDetails(null);
        
      } finally {
  setLoading(false);
}

    }
    data()
  }, [id])
  const threeCheck = [{ title: "Document integrity", description: "The stored documentHash matches the hash recomputed from the deed file.", icon: <FilePlusCorner /> },
  {
    title: "Owner and deed hash ", description: "ownerWithDeedHash is correctly bound to the current owner and this deed. ", icon: <Link2 />,

  }, {
    title: "Ownership record ", description: " Registry record found with 3 ownership entries on file.", icon: <Database />
  }
  ]

  const details = [{ icon: <MapPinCheck />, title: "District",value:ownerDetails?.district },
  { icon: <Navigation2 />, title: "Upazila",value:ownerDetails?.upazila },
  { icon: <Houses />, title: "Mouza",value:ownerDetails?.mouza },
  { icon: <MapPinSearch />, title: "Dag no.",value:ownerDetails?.dagNo },
  { icon: <FileText />, title: "Khatian no",value:ownerDetails?.khatianNo },
  // { icon: <CalendarCheck />, title: "Registration date",value:ownerDetails. },
  { icon: <Ruler />, title: "Land area",value:ownerDetails?.landArea },

  ]
  if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-lg">Loading deed details...</p>
      </div>
    </div>
  );
}
  return (
    
    <div>
      {
        ownerDetails ? <div className='bg-linear-to-bl/oklch from-blue-900 to-slate-900  h-full w-full text-white'>
          {/* <div>
        <h1>Property overview</h1>
        <div>
            <p>Property ID</p>
            <p>LV-DHK-2014-004827</p>
        </div>
        <div>
            <p>Location</p>
            <p>Plot 14, Road 52, Gulshan-2, Dhaka</p>
        </div><div>
            <p>Registration date</p>
            <p>12 Mar 2014</p>
        </div>
        <div>
            <p>Area</p>
            <p>5 katha </p>
        </div>
      </div>

      <div>
        <div>
            <p>Verification status</p>
        </div>
        <div>
            <p><span className=''>98/</span><span>100</span></p>
            <p>Verified · Low risk</p>
            </div>
      
<div>
   <div>
     <p>Document integrity</p> <p>Passed</p>

   </div>
   <div>
    <p>  </p>  <p></p>
   </div>
    
</div>
      
      </div> */}


          <div className='p-2 md:px-20 border-white rounded-2xl flex flex-col md:flex-row justify-between '>
            <div className=' p-3 border-white rounded-2xl md:p-10' >
              <p className='text-4xl font-semibold text-white md:text-7xl mb-5'>Deed Verification</p>
              <p>The deed record and its cryptographic checks, as returned by the LandVerify registry.</p>
              <p className='text-3xl font-bold text-green-400'>{ownerDetails.currentOwner.name}</p>
              <p className='text-xl font-bold text-green-400'>Deed ID :<span>
                {ownerDetails.deedId}</span></p>
                <p className='text-xl font-bold text-green-400'> NID :<span>
                {ownerDetails.currentOwner.nid}</span></p>

            </div>
            <div className='flex flex-col gap-5'>
              <div className='flex flex-col md:flex-row md:gap-x-6 mt-5 md:mt-10'>

                <div className='w-1/3 md:w-full  '>
                  < p className='bg-green-500/20 rounded-2xl border-2 
             border-green-500 flex px-3 py-1 md:justify-center items-center gap-2'>
                    <div className='rounded-full w-4 h-4 md:w-5 md:h-5 bg-green-400 animate-pulse'></div>
                    <span className='text-green-500'>Verified</span></p>



                </div>
              </div>
              <div className='p-3 w-fit h-fit border-green-400 border-2 rounded-2xl md:p-10 bg-blue-100/10 flex  justify-center items-center'>
                <QRcode url={`${window.location.origin}/verification/${id}`} />

              </div>
<div>
  <GeneratePdf detailsForPdf={detailsForPdf} id={id}/>
  </div>
            </div>



          </div>


          <div className='px-2 md:px-20 mt-10'>
            <div className='flex justify-between flex-col md:flex-row  gap-5'>
              {threeCheck.map((e, index) => {
                return <div key={index} className='bg-linear-to-tr/lch from-blue-900 to-slate-900 p-5 md:w-1/3 rounded-2xl border-2 border-white'>
                  <div className='flex justify-between mb-5'>
                    <p className='bg-blue-950 rounded-2xl p-1 px-2 inline-block  border-white' style={{ borderWidth: 1 }}>{e.icon}</p>
                    < p className='bg-green-500/20 rounded-3xl border-2 border-green-500 flex px-2 py-1 justify-between items-center gap-2'><div className='rounded-full w-3  h-3 bg-green-400 animate-pulse'></div><span className='text-green-500 text-sm'>Verified</span></p>

                  </div>
                  <div className='flex mb-3'>
                    <p className='text-white text-xl font-semibold items-center'>{e.title}</p>
                    <span ><Check className='text-green-400' /></span>
                  </div>
                  <p className='text-gray-300 mb-3'>{e.description}</p>
                  <p className='bg-blue-950 rounded-2xl p-1 px-2 inline-block'>SHA-256</p>
                </div>
              })}
            </div>


          </div>
          <div className='px-2  md:px-20 mt-20'>
            <div className='w-full border-white p-5 rounded-2xl ' style={{ borderWidth: 1 }}>
              <div className='mb-5'>
                <p className='text-2xl font-semibold'>Land details</p>
                <p>As registered in the land record.</p>
              </div>
              <div className='flex flex-2  flex-wrap gap-3 items-center justify-center'>

                {
                  details.map((e, index) => {
                    return <div key={index} className='p-5  border-white rounded w-full ' style={{ borderWidth: 1 }}>
                      <div className='flex mb-2'>
                        <p className='text-gray-300 mr-3'>{e.icon}</p>
                        <p className='text-green-500'>{e.title}</p>
                      </div>
                      <p>{e.value}</p>
                    </div>
                  })
                }
              </div>

            </div>
          </div>


          <div className='p-3 md:px-20 mt-20'>
            <div className='w-full border-white p-5 rounded-2xl ' style={{ borderWidth: 1 }}>
              <div>
                <p className='text-2xl font-semibold'>Ownership history</p>
                <p>Every recorded transfer, newest first.</p>
              </div>
              {
                ownerDetails && <div className='flex flex-col gap-10'>
                  {ownerDetails && ownerDetails.ownershipHistory?.map((e, index) => {

                    return <div className='w-full bg-linear-to-bl/oklch from-blue-900 to-slate-900 p-5 ' key={index}>
                      <div className='flex  justify-between'>
                        <p className='text-2xl text-white font-medium'>{e.ownerName}</p>
                        <p>{index === 0 ? <span className='px-2 py-1 rounded-2xl border-2 border-green-400 text-green-400'>Current Owner</span> : <span className='px-2 py-1 rounded-2xl border-2 border-red-400 text-red-400'>Previous Owner</span>}</p>
                      </div>
                      <p>Nid:<span>{e.nid}</span></p>
                      <div>
                        <h1>From Date:{new Date(e.fromDate).toLocaleString("en-GB", {


                          timeZone: "Asia/Dhaka",
                          day: "2-digit",
                          month: "short",
                          year: "numeric"


                        })}</h1>
                    <h1>
  To Date:{" "}
  {index === 0
    ? new Date().toLocaleDateString("en-GB", {
        timeZone: "Asia/Dhaka",
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : e.toDate
      ? new Date(e.toDate).toLocaleDateString("en-GB", {
          timeZone: "Asia/Dhaka",
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "Present"}
</h1>
                      </div>
                      <div className='w-full '>
                        <p>Transfer Hash:</p>
                        <div className='w-full'>
                          <p className='text-green-500 text-wrap w-full  overflow-x-scroll md:overflow-hidden'>{e.transferHash}</p>
                        </div>

                      </div>
                    </div>
                  })}
                </div>
              }



            </div>

          </div>

        </div> : <div>Id not found</div>
      }

    </div>

  )
}

export default DeedDetails
