import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import DeedGeneratePage from './Pages/DeedGeneratePage.jsx'
import DeedTransfer from './Pages/DeedTransfer.jsx'
  import { ToastContainer, toast } from 'react-toastify';
import DeedVerification from './Pages/DeedVerification.jsx'
import AllId from './Pages/AllId.jsx'
import DeedDetails from './Pages/DeedDetails.jsx'


const router=createBrowserRouter([
  {path:"/",element:<App/>},

  {path:"/deedgenerate",element:<DeedGeneratePage/>},
  {path:"/transfer",element:<DeedTransfer/>},
  {path:"/verification",element:<DeedVerification/>},
 
  {path:"/allid",element:<AllId/>},
  {path:"/verification/:id",element:<DeedDetails/>}
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </StrictMode>,
)
