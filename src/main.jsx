import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './create-trip'
import Header from './components/custom/Header'
import { Toaster } from './components/ui/sonner'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Tripdata from './view-trip/[tripdata]'
import Mytrips from './mytrips'
const router =createBrowserRouter([
  {
    path:"/",
    element:<App/>
  },
  {
    path:"/create-trip",
    element:<CreateTrip/>
  },
  {
    path:"/tripdata/:docid",
    element:<Tripdata/>
  },
  {
    path:"/mytrips",
    element:<Mytrips/>
  }
])
createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID_KEY}>
    <Header/>
    <Toaster />
    <RouterProvider router={router}/>
    </GoogleOAuthProvider>
  // </StrictMode>,
)
