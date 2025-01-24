import React from 'react'

const Infosection = ({trip}) => {
  return (
    <div>
      <img src="/single.jpg" alt=""  className='h-[360px] w-full object-cover rounded-xl'/>
      <div className='my-5 flex flex-col gap-2'>
        <h2 className='font-bold text-2xl'>{trip?.userselection?.location.toUpperCase()}</h2>
        <div className='flex gap-4'>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>🗓️ {trip?.userselection?.Days} Day</h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>💰 {trip?.userselection?.Budget} Budget</h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>👯‍♀️ No. of People: {trip?.userselection?.traveler}</h2>
        </div>
      </div>
    </div>
  )
}

export default Infosection
