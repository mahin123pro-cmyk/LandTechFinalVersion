import { BadgeCheck, Clock4, DatabaseCheck, Eye, FileCheck, FileText, Hash, Lock, PanelRightOpen, QrCode, Search, TriangleAlert } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import deedpic from './assets/deed_of_sale.png'

import logos from "./assets/logos.png"


function App() {


  const howCanweVarificationText = [{ number: "১", headline: "নথি জমা দিন", details: "একটি স্ক্যান কপি বা PDF আপলোড করুন, দলিল নম্বর লিখুন অথবা দলিলে মুদ্রিত QR কোড স্ক্যান করুন।" },
  { number: "২", headline: "আমরা রেজিস্ট্রির সঙ্গে এটি যাচাই করি।", details: "LandVerify নথির হ্যাশ ও বিবরণ সরকারি রেকর্ডের সঙ্গে মিলিয়ে দেখে এবং কোনো পরিবর্তন করা হয়েছে কি না তা যাচাই করে।" },
  { number: "৩", headline: "যাচাইকরণ প্রতিবেদন পান", details: "ফলাফল, বর্তমান মালিক এবং মালিকানার ইতিহাস দেখুন। প্রতিবেদনটি PDF হিসেবে ডাউনলোড করুন।" }
  ]

  const EverythingText = [{ number: <FileCheck className="size-7" />, headline: "Deed verification", details: "Confirm a deed is genuine and matches the registered version." },
  { number: <TriangleAlert className="size-7" />, headline: "Tamper detection", details: "Spot altered names, areas, dates, and signatures before you sign." },
  {
    number: <Clock4 className="size-7" />, headline: "Ownership history", details: "Trace every transfer on a parcel, from first registration to today."
  }, {
    number: <QrCode className="size-7" />, headline: "QR and hash checks", details: "Verify instantly by scanning a code or pasting a document hash."
  }
  ]

  const BuiltPartData = [{ logo: <Hash className="size-7 text-green-400" />, headline: "Hash fingerprints", details: "Any edit to a registered document, even one character, changes its SHA-256 hash." },

  { logo: <Lock className="size-7 text-green-400" />, headline: "Encrypted in transit and at rest", details: "Uploaded files are encrypted and deleted after the check unless you save the report." },
  { logo: <Eye className="size-7 text-green-400" />, headline: "Full audit trail", details: "Every lookup and registry update is logged and reviewable by authorised officers." }, {
    logo: <BadgeCheck className="size-7 text-green-400" />, headline: "Role-based access", details: "Land-office staff, legal professionals, and the public each see only what they need."
  }
  ]

  const navigate = useNavigate()
  const verificationNavigate = () => {
    navigate("/verification")
  }
  const [search, setSearch] = useState("")

  const submitSearch = async () => {

    navigate(`/verification/${search}`)
  }
  const [show,setShow]=useState(false)
  const handleshow=()=>{
setShow(!show)
  }
  return (
    <div className=''>

      <nav className='flex justify-between px-4 md:justify-around items-center md:px-10 fixed left-0 right-0 bg-white z-10 md:p-4'>

        <div className=' flex  items-center gap-x-7'>

          <div className=' flex items-center'><img src={logos} className='w-14' /><span className='font-bold text-xl text-blue-950 md:text-4xl'>VUMI</span></div>

          <div className='hidden md:block'>
            <ul className='flex flex-row text-gray-500 cursor-pointer text-xl gap-x-4'>
              <a href='#howitwork'>এটা যেভাবে কাজ করে
              </a>
              <a href='#features'>বৈশিষ্ট্যসমূহ
              </a>
              <a href='#security'>নিরাপত্তা</a>
              
            </ul>
          </div>
        </div>




        <div className='hidden md:flex items-center  gap-x-5 '>
          
            <ul className='flex text-lg text-nowrap md:text-2xl font-semibold gap-x-4 text-blue-950'>
              <Link to="admin/transfer" className=''>দলিল হস্তান্তর</Link>
              <Link to="/admin/deedgenerate">দলিল প্রস্তুতকরণ</Link>
              
            </ul>
          
          <button className='hidden bg-green-700 cursor-pointer md:flex rounded items-center px-2 py-1 text-sm md:p-3' onClick={verificationNavigate}><FileText size={15} className='text-white text-sm' /> <span className='text-white'>দলিল যাচাইকরণ</span></button>

        </div>
        <div className='md:hidden'>
          <PanelRightOpen onClick={handleshow} />
        </div>
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

  <Link to="/admin/transfer" onClick={() => setShow(false)}>
    Transfer Deed
  </Link>

  <Link to="/admin/deedgenerate" onClick={() => setShow(false)}>
    Deed Generate
  </Link>
</div>
      {/* <Link to="/deedmaker" className='inline cursor-pointer'>Deed Maker</Link> */}


      <div className='bg-blue-950 p-5 overflow-x-hidden w-full md:min-h-screen md:px-20 flex flex-col md:flex-row  '>
        <div className='flex-1 flex flex-col gap-y-7 mt-10'>

          <div className='w-full mt-10 mb-1'>
            <h1 className='text-white text-4xl text-nowrap md:text-6xl font-bold' >মালিকানা যাচাইকরণ</h1>
            <h1 className='text-zinc-300 text-4xl text-nowrap md:text-6xl font-bold' >সম্পত্তি যাচাইকরণ</h1>
            <h1 className='text-zinc-300 text-4xl text-nowrap md:text-6xl  font-bold '>বিশ্বস্ততা যাচাইকরণ</h1>
          </div>
          <div className='mb-5'>
            <p className='text-zinc-300 text-xl font-thin md:text-2xl'>কয়েক সেকেন্ডেই সরকারি রেকর্ডের সঙ্গে মিলিয়ে আপনার জমির দলিল যাচাই করুন!<b>LandVerify-</b>এর মাধ্যমে দলিলে কোনো জালিয়াতি বা কারসাজি আছে কি না শনাক্ত করুন, বর্তমান মালিকের পরিচয় নিশ্চিত করুন এবং জমির মালিকানা পরিবর্তনের সম্পূর্ণ ইতিহাস দেখুন।</p>

          </div>
          <div className='flex bg-amber-50 justify-between '>
            <input type='text' onChange={((e) => { setSearch(e.target.value) })} className='placeholder-gray-300 border-white w-full md:text-3xl   px-4 py-3' style={{ borderWidth: 1 }} placeholder='DV-ID:94040955' />
            <Search onClick={submitSearch} size={68} className='bg-gray-300 px-3 transition-colors duration-1000 hover:bg-blue-500 hover:text-white' />
          </div>
          <div className='mb-3'>
            <button className='bg-green-600 cursor-pointer  flex rounded md:px-5 md:py-5 md:text-2xl px-3 py-2' onClick={verificationNavigate}><FileText className='text-white size-5 font-semibold md:size-10' /> <span className='text-white font-semibold ml-2'>দলিল যাচাইকরণ</span></button>

          </div>

          <div className=' flex gap-x-7 flex-col md:flex-row'><h1 className='flex justify-self-start gap-3 md:items-center'><span className='text-green-600  font-semibold text-2xl'>#</span> <span className='text-zinc-300 text-sm'>Cryptographic hash check</span></h1>
            <h1 className='flex justify-self-start gap-3 md:items-center'><span><DatabaseCheck className='text-green-600 text-2xl font-semibold size-5' /></span> <span className='text-zinc-300 text-sm'>Registry-linked records</span></h1>
          </div>
        </div>

        <div className=' md:flex-1 mt-5 md:mt-20 md:rotate-3 md:h-full'>
          <img src={deedpic} className='w-full h-full  object-contain' style={{ maxHeight: "600px" }} />
        </div>

      </div>

      <div>
 
</div>
      <div className='bg-gray-50 px-5 w-full  md:px-20 pt-6  scroll-mt-20' id='howitwork'>
        <div className='pt-5 md:pt-14 ' >
          <h1 className='text-black md:font-semibold text-4xl' >যাচাইকরণ যেভাবে কাজ করে</h1>
          <p className='text-zinc-600 text-lg md:text-xl max-w-3xl pt-4'>দ্রুত যাচাইয়ের জন্য কোনো অ্যাকাউন্টের প্রয়োজন নেই। একটি দলিল আপলোড করুন অথবা এর QR কোড স্ক্যান করুন এবং নির্ভরযোগ্য ফলাফল পান।</p>
        </div>
        <div className='flex flex-col md:flex-row justify-between gap-5 pt-10'>
          {
            howCanweVarificationText.map((e) => {
              return <div key={e.number} className='bg-white p-6 rounded-xl shadow-sm border-zinc-200 shadow-gray-300  '>
                <h1 className='bg-green-500/40 text-green-800 font-semibold inline-block rounded px-2 mb-4'>{e.number}</h1>
                <h1 className='text-xl font-semibold'>{e.headline}</h1>
                <p className='text-sm text-gray-600'>{e.details}</p>
              </div>
            })
          }
        </div>


      </div>


      <div className='bg-gray-50 px-5 w-full md:px-20 pt-20 pb-6 ' >
        <div className='pt-5  md:pt-14 scroll-mt-20' id="features">
          <h1 className='text-black md:font-semibold text-4xl'>Everything you need to confirm a property is what it claims to be</h1>


        </div>
        <div className='flex flex-col md:flex-row justify-between gap-5 pt-10'>
          {
            EverythingText.map((e) => {
              return <div key={e.details} className='bg-white p-6 rounded-xl shadow-sm border-zinc-200 shadow-gray-300  '>
                <h1 className='bg-blue-300/40 text-black font-semibold inline-block rounded px-2 mb-4 py-2'>{e.number}</h1>
                <h1 className='text-xl font-semibold'>{e.headline}</h1>
                <p className='text-sm text-gray-600'>{e.details}</p>
              </div>
            })
          }
        </div>


      </div>


      <div className='bg-blue-950 text-white p-5' id='security'>
        <div className='mt-10 md:m-20 scroll-mt-20'>
          <h1 className='text-4xl md:font-semibold mb-3'>Built so records can't be quietly changed</h1>
          <p className='text-xl text-gray-300 mb-6 '>Every verification is based on the registry's own data and protected from the moment you upload.</p>
        </div>
        <div className='flex w-full flex-col  md:flex-row gap-6 md:gap-10 flex-wrap justify-center '>
          {BuiltPartData.map((e) => {
            return <div key={e.details} className='rounded-2xl border-gray-300 md:w-1/3 w-full p-5' style={{ borderWidth: .1 }}>
              <h1 className='mb-7'>{e.logo}</h1>
              <p className='font-bold text-2xl mb-2'>{e.headline}</p>
              <p className='text-gray-300'>{e.details}</p>
            </div>
          })}
        </div>
      </div>


      <div className=' flex flex-col px-5 md:flex-row justify-around md:px-20 py-10' >
        <div className= 'w-full md:w-1/5'>
          <div className=' flex items-center'><img src={logos} className='w-14' /><span className='font-bold text-blue-950 text-4xl'>VUMI</span></div>
          <p>Deed and ownership verification for buyers, owners, legal professionals, and land offices.</p>


        </div>
        <div className='w-full md:w-1/5 '>
          <h1 className='font-semibold text-xl mb-3'>Platform</h1>
          <div className='text-gray-400'>
            <p>Verify a Document</p>
            <p>Search Property</p>
            <p>QR Verification</p>
          </div>
        </div>

        <div className=' w-full md:w-1/5 '>
          <h1 className='font-semibold text-xl mb-3'>For professionals</h1>
          <div className='text-gray-400'>
            <p>Legal Teams </p>
            <p>Land Offices </p>
            <p> Api Access</p>


          </div>
        </div>
        <div className='w-full md:w-1/5 '>
          <h1 className='font-semibold text-xl mb-3'>Support</h1>
          <div className='text-gray-400'>
            <p>Help Center</p>
            <p>Contact</p>
            <p>Report a deed</p>
          </div>
        </div>
      </div>
    </div>






    
  )
}

export default App
