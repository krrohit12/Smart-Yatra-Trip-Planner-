import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Hotels = ({ trip }) => {
  const [hotelImages, setHotelImages] = useState({}); // Store images for each hotel

  useEffect(() => {
    fetchHotelImages();
  }, [trip]);

  const fetchHotelImages = async () => {
    if (!trip?.tripdata?.HOTEL_LISTS) return;

    const updatedImages = {};
    for (const hotel of trip.tripdata.HOTEL_LISTS) {
      try {
        const response = await fetch(
          `https://www.googleapis.com/customsearch/v1?key=${import.meta.env.VITE_GOOGLE_API_KEY}&cx=${import.meta.env.VITE_CUSTOM_SEARCH_ENGINE_KEY}&q=${hotel.NAME}&searchType=image&num=1`
        );

        if (!response.ok) {
          throw new Error(`Error fetching image for ${hotel.NAME}`);
        }

        const data = await response.json();
        updatedImages[hotel.NAME] = data.items?.[0]?.link || '/Hotel.jpg'; // Fallback to default image
      } catch (error) {
        console.error(`Error fetching image for ${hotel.NAME}:`, error);
        updatedImages[hotel.NAME] = '/Hotel.jpg'; // Fallback to default image
      }
    }

    setHotelImages(updatedImages);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mt-5">Hotel Recommendations</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-5">
        {trip?.tripdata?.HOTEL_LISTS.map((hotel, index) => (
          <Link
            to={`https://www.google.com/maps?q=${hotel.NAME} ${hotel.HOTEL_ADDRESS}`}
            target="_blank"
            key={index}
          >
            <div className="hover:scale-110 transition-all">
              <img
                className="rounded-xl w-full h-40 object-cover"
                src={hotelImages[hotel.NAME] || '/Hotel.jpg'} // Display fetched or fallback image
                alt={hotel.NAME}
              />
              <div>
                <h2 className="font-medium my-2 text-lg">{hotel.NAME}</h2>
                <h2 className="font-xs my-2">📍 {hotel.HOTEL_ADDRESS}</h2>
                <h2 className="text-gray-600 my-2">💰 {hotel.PRICE}</h2>
                <h2 className="text-gray-600 my-2">⭐{hotel.RATING}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Hotels;
