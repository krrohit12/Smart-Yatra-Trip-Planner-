import React, { useEffect, useState } from 'react'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '@/Service/firebase_config';
import Cards from './components/Cards';
import { useNavigate, useNavigation } from 'react-router-dom';
const Mytrips = () => {
    
    const [history, sethistory] = useState([])
    const navigation=useNavigate();
    useEffect(()=>{
        tripdetails();
    },[])
    
    const tripdetails = async() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if(!user){
            navigation('/');
            return;
        }
        sethistory([]);
        const q = query(collection(db, "AItrips"), where("useremail", "==", user?.email));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            sethistory(prev=>[...prev,doc.data()])
        });
    }
    const handleDelete = (id) => {
        // Update state to remove the deleted trip
        sethistory((prev) => prev.filter((trip) => trip.id !== id));
      };
    
    return (
        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
            <h2 className='font-bold text-3xl'>My Trips</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-5 mt-8'>
            {history.map((item,ind)=>(
                // <h2>{item.id}</h2>
                <Cards trip={item} onDelete={handleDelete}/>
            ))}
            </div>
        </div>
    )
}

export default Mytrips
