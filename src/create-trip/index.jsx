import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AI_PROMPT, SelectBudget, TravelList } from '@/constants/Options'
import { chatSession } from '@/Service/Aimodel'
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/Service/firebase_config'
import { useNavigate } from 'react-router-dom'

const CreateTrip = () => {
  const [place, setplace] = useState("rohit")
  const [dialog, setdialog] = useState(false)
  const [formdata, setformdata] = useState([]);
  const [loading, setloading] = useState(false)
  const navigate=useNavigate();
  const handleclick = (name, value) => {
    setformdata({
      ...formdata,
      [name]: value
    })
  }
  useEffect(() => {
    // console.log(formdata)
  }, [formdata])
  console.log("finalprompt")
  const login=useGoogleLogin({
    onSuccess:(resp)=>getuserprofile(resp),
    onError:(e)=>console.log(e)
  })
  const generatetrip = async () => {
    console.log("generatetrip function called"); 
    const user = localStorage.getItem('user');
    if (!user) {
      setdialog(true);
      return;
    }
    if (!formdata?.location || !formdata?.Days || !formdata?.Budget || !formdata?.traveler) {
      toast("Please Enter All Details")
      return;
    }
    setloading(true);
    const finalprompt = AI_PROMPT.
      replace('{Location}', formdata?.location).
      replace('{days}', formdata?.Days).
      replace('{traveler}', formdata?.traveler).
      replace('{budget}', formdata?.Budget);
      // console.log("finalprompt", finalprompt);
      const result = await chatSession.sendMessage(finalprompt);
      // console.log(result?.response?.text())
      setloading(false);
      saveaitrip(result?.response?.text());
    }
  
  const getuserprofile=(tokenInfo)=>{
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,{
      headers:{
        Authorization:`Bearer ${tokenInfo?.access_token}`,
        Accept:'Application/json'
      }
    }).then((resp)=>{
      localStorage.setItem('user',JSON.stringify(resp.data))
      setdialog(false);
      generatetrip();
      // console.log(resp)
    })
  }
  const saveaitrip=async(Tripdata)=>{
    setloading(true);
    // console.log(Tripdata)
    const user=JSON.parse(localStorage.getItem('user'));
    const docid=Date.now().toString();
    await setDoc(doc(db, "AItrips", docid), {
      userselection:formdata,
      tripdata:JSON.parse(Tripdata),
      useremail:user?.email,
      id:docid
    });
    setloading(false);
    navigate('/tripdata/'+docid)
  }
  // console.log(place)
  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-70 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your travel preferences</h2>
      <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information and our trip planner will generate a customized itinerary based on your preferences </p>
      <div className='mt-20 flex flex-col gap-10'>
        <div>
          <h2 className='text-xl my-3 font-medium '>What is your destination of choice?</h2>
          <input type="text" placeholder='Please enter..' className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
            onChange={(e) => {
              setplace(e.target.value);
              handleclick('location', e.target.value)
            }} />


          {/* <GooglePlacesAutocomplete
          apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
          /> */}
        </div>
        <div>
          <h2 className='text-xl my-3 font-medium '>How many days are you planning for your trip?</h2>
          <input type="number" min="0" placeholder='Ex.3' className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
            onChange={(e) => {
              handleclick('Days', e.target.value)
            }}
          />
        </div>
      </div>
      <div>
        <h2 className='text-xl my-3 font-medium '>What is your Budget ?</h2>
        <div className='grid grid-cols-3 gap-5 mt-4'>
          {SelectBudget.map((item, ind) => (
            <div key={ind} className={`p-4 cursor-pointer border rounded-lg hover:shadow-lg ${formdata?.Budget === item.title && 'shadow-lg border-black'
              }`}
              onClick={(e) => {
                handleclick('Budget', item.title)
              }}
            >
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className='text-xl my-3 font-medium '>Pick Your Perfect Travel Group for an Unforgettable Experience!</h2>
        <div className='grid grid-cols-4 gap-5 mt-4'>
          {TravelList.map((item, ind) => (
            <div key={ind} className={`p-4 cursor-pointer border rounded-lg hover:shadow-lg ${formdata?.traveler === item.numberOfPeople && 'shadow-lg border-black'
              }`}
              onClick={(e) => {
                handleclick('traveler', item.numberOfPeople)
              }}
            >
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className='my-10 flex justify-end'>
        <Button 
        disabled={loading}
        onClick={generatetrip}>
        {
          loading?
          <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' />:"Generate Trip"
        }
        </Button>
      </div>
      <Dialog open={dialog} onOpenChange={(open) => setdialog(open)}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription> 
              <img src="/logo.svg" alt="" />
              <h2 className='font-bold text-lg mt-6'>Sign In with Google</h2>
              <p >Sign in to the App with Google Autentication</p>
              <Button onClick={login} className="w-full mt-5" >Sign in with Google</Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>


    </div>
  )
}

export default CreateTrip
