
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import App from "./App.jsx";


import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";

import DeedGeneratePage from "./Pages/DeedGeneratePage.jsx";
import DeedTransfer from "./Pages/DeedTransfer.jsx";
import DeedVerification from "./Pages/DeedVerification.jsx";
import AllId from "./Pages/AllId.jsx";
import DeedDetails from "./Pages/DeedDetails.jsx";
import Verify from "./Pages/Verify.jsx";
import Profle from "./Pages/Profle.jsx";
import ProtectedRoute from "./Pages/ProtectedRoute.jsx";
import AdminNav from "./Pages/AdminNav.jsx";



const router = createBrowserRouter([
  // Public routes
  { path: "/", element: <App /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/verification", element: <DeedVerification /> },
  { path: "/verification/:id", element: <DeedDetails /> },
  
  ,
      { path: "/allid", element: <AllId />},

{path:"/otp",element:<Verify/>},

{
  path: "/admin",
  element: <ProtectedRoute />,
  children: [
 {index:true,element:<DeedTransfer />},
    {
      path: "deedgenerate",
      element: <DeedGeneratePage />,
    },
    { path: "transfer", element: <DeedTransfer /> }
  ],
}
  // Any logged-in user
 
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={3000} />
    
  </StrictMode>
);
