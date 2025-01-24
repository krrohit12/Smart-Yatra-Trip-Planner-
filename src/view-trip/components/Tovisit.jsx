import React from 'react'
import Card from './Card'

const Tovisit = ({trip}) => {
  return (
    <div className='my-5'>
      <h2 className='font-bold text-xl'>Places To Visit</h2>
      <div>
         {trip?.tripdata?.DAYLISTS.map((item,ind)=>(
            <div className='mt-5'>
                <h2 className='font-medium text-lg'>DAY {item.DAY}</h2> 
                <div className='grid grid-cols-2 gap-5 '>
                {item.LIST.map((it,ind)=>(
                  <div className='my-1'>
                    <h2 className='font-medium text-sm text-orange-600'>{it.BEST_VISIT_TIME}</h2>
                      <Card place={it}/>
                    </div>
                ))}
                </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default Tovisit
