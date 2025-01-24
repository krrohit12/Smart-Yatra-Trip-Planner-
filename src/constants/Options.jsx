export const SelectBudget=[
    {
        id: 1,
        title: 'Cheap',
        desc: 'Stay conscious of costs',
        icon: '💵'  // Dollar emoji
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Balanced between price and quality',
        icon: '💰'  // Money bag emoji
    },
    {
        id: 3,
        title: 'Luxurious',
        desc: 'Premium options for a lavish experience',
        icon: '💎'  // Diamond emoji
    }
]

export const TravelList=[
    {
        id: 1,
        title: 'Just Me',
        description: 'A solo travel adventure, exploring the world alone.',
        icon: '🧳',  // Luggage emoji
        numberOfPeople: 1
    },
    {
        id: 2,
        title: 'Couple Retreat',
        description: 'A romantic getaway for two to unwind and relax.',
        icon: '💑',  // Couple emoji
        numberOfPeople: 2
    },
    {
        id: 3,
        title: 'Family Trip',
        description: 'A fun vacation with the whole family to enjoy together.',
        icon: '👨‍👩‍👧‍👦',  // Family emoji
        numberOfPeople: 4
    },
    {
        id: 4,
        title: 'Group Travel',
        description: 'A group adventure with friends to explore new places.',
        icon: '👯‍♂️',  // People with bunny ears emoji (representing a group)
        numberOfPeople: 10
    }
]
export const AI_PROMPT=
    "Generate a travel plan for: "+
    "- Location: {Location} "+
    "- Duration: {days} days "+
    "- Number of travelers: {traveler} "+
    "- Budget: {budget} "+
    "Provide the output in **strict JSON format** with only the following fields: "+
    "1. **HOTEL_LISTS**: "+
    "A list of hotels(aprrox 4) with the following structure: "+
    "["+
    "{"+
    "\"NAME\": \"Hotel Name\", "+
    "\"HOTEL_ADDRESS\": \"Hotel Address\", "+
    "\"PRICE\": 100, "+
    "\"IMAGE\": \"https://image.url\", "+
    "\"RATING\": 4.5"+
    "}, "+
    "...] "+
    "2. **DAYLISTS**: "+
    "A list of daily itineraries with the following structure: "+
    "["+
    "{"+
    "\"DAY\": 1, "+
    "\"LIST\": ["+
    "{"+
    "\"PLACE_NAME\": \"Place Name\", "+
    "\"PLACE_DETAILS\": \"Details about the place\", "+
    "\"PLACE_IMAGE_URL\": \"Provide me with a direct image URL of place that is valid and embeddable\", "+
    "\"TICKET_PRICING\": 50, "+
    "\"TRAVEL_TIME\": \"2 hours\", "+
    "\"BEST_VISIT_TIME\": \"10:00\""+
    "}, "+
    "...] "+
    "} "+
    "...] "+
    "Do not include any other fields or additional data."
// console.log(AI_PROMPT)