import { Button } from '@/components/ui/button';
import React from 'react';
import { Link } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/Service/firebase_config';

const Cards = ({ trip, onDelete }) => {
  // Function to handle card deletion
  const handleDelete = async () => {
    try {
      // Delete the document from Firebase
      await deleteDoc(doc(db, 'AItrips', trip.id));
      // Call the onDelete function to remove the card from the UI
      onDelete(trip.id);
    } catch (error) {
      console.error('Error deleting trip:', error);
    }
  };

  return (
    <div className="hover:scale-105 transition-all">
      <Link to={`/tripdata/${trip?.id}`}>
        <img src="/single.jpg" alt="" className="object-cover rounded-3xl" />
      </Link>
      <div>
        <h2 className="font-bold text-lg">
          {trip?.userselection?.location.toUpperCase()}
        </h2>
        <div className="flex justify-between items-center">
          <h2 className="text-gray-500 text-sm">
            {trip?.userselection?.Days} Days trip with {trip?.userselection?.Budget} Budget
          </h2>
          <Button className="text-red-500 w-[25px] h-[25px]" onClick={handleDelete}>
            <MdDelete />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
