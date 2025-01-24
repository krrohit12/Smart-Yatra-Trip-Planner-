import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Card = ({ place }) => {
  const [image, setImage] = useState('/Noimage.jpg'); 
  useEffect(() => {
    fetchImage();
  }, [place]);

  const fetchImage = async () => {
    try {
      const query = place.PLACE_NAME;
      if (!query || query.trim() === "") {
        console.error("Invalid PLACE_NAME:", query);
        setImage('/Noimage.jpg');
        return;
      }
  
      const url = `https://www.googleapis.com/customsearch/v1?key=${import.meta.env.VITE_GOOGLE_API_KEY}&cx=${import.meta.env.VITE_CUSTOM_SEARCH_ENGINE_KEY}&q=${query}&searchType=image&num=1`;
      console.log("Fetching image with URL:", url);
  
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`Error fetching image: ${response.statusText}`);
      }
  
      const data = await response.json();
      const imageUrl = data.items?.[0]?.link;
  
      if (imageUrl) {
        setImage(imageUrl);
      } else {
        console.warn(`No images found for ${query}`);
        setImage('/Noimage.jpg'); // Set fallback image
      }
    } catch (error) {
      console.error("Error fetching image:", error);
      setImage('/Noimage.jpg'); // Set fallback image on error
    }
  };
  return (
    <Link to={'https://www.google.com/maps?q=' + place.PLACE_NAME} target="_blank">
      <div className="border rounded-xl p-3 flex gap-5 hover:scale-105 transition-all cursor-pointer">
        <img
          className="w-[100px] h-[100px] rounded-lg object-cover"
          src={image}
          alt={place.PLACE_NAME}
        />
        <div>
          <h2 className="font-bold text-lg">{place.PLACE_NAME}</h2>
          <p className="text-sm text-gray-500">{place.PLACE_DETAILS}</p>
          <p>Ticket Price: 💴 {place.TICKET_PRICING}</p>
          <p>⏱️ {place.TRAVEL_TIME}</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
