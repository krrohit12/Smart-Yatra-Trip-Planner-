import { db } from '@/Service/firebase_config';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import Infosection from '../components/Infosection';
import Hotels from '../components/Hotels';
import Tovisit from '../components/Tovisit';
import Footer from '../components/Footer';

const Tripdata = () => {
  const{docid}=useParams();
  const [trip, settrip] = useState([])
  useEffect(() => {
    docid&&getdata();
  }, [docid])
  
  const getdata=async()=>{
    const docsnap=await getDoc(doc(db, "AItrips", docid))
    if(docsnap.exists()){
        // console.log(docsnap.data());
        settrip(docsnap.data())
    }
    else toast("no such data found")
  }
  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56 '>
      <Infosection trip={trip}/>
      <Hotels trip={trip}/>
      <Tovisit trip={trip}/>
      <Footer/>
    </div>
  )
}

export default Tripdata
