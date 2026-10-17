import React from 'react'
import logos from "../assets/logos.png"
import { Link } from 'lucide-react'
function AdminNav() {
  return (
    <div >
      <nav className='flex justify-between px-4 md:justify-around items-center md:px-10 fixed left-0 right-0 bg-amber-300 z-10 md:p-4'>

        <div className=' flex  items-center gap-x-7'>

          <div className=' flex items-center'><img src={logos} className='w-14' /><span className='font-bold text-xl text-blue-950 md:text-4xl'>VUMI</span></div>

        
        </div>




        <div className='flex items-center  gap-x-5 '>
          
            <ul className='flex text-lg text-nowrap md:text-2xl font-semibold gap-x-4 text-blue-950'>
              <Link to="/admin/transfer" className='text-black'>Transfer Deed</Link>
              <Link to="/admin/deedgenerate">Deed Generate</Link>
              
            </ul>
          
          {/* <button className='hidden bg-green-700 cursor-pointer md:flex rounded items-center px-2 py-1 text-sm md:p-3' onClick={verificationNavigate}><FileText size={15} className='text-white text-sm' /> <span className='text-white'>Verify a Document</span></button> */}

        </div>
        {/* <div className='md:hidden'>
          <PanelRightOpen onClick={handleshow} />
        </div> */}
      </nav>
    </div>
  )
}

export default AdminNav
