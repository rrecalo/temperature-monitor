import React from 'react'

const Card = ({data, dataLabel, ...props}) => {
  return (
    <div className='w-1/3 lg:w-1/4 h-32 bg-stone-900 
    text-center font-normal text-stone-400 text-lg lg:text-2xl p-4 rounded-2xl'>
        {dataLabel}
        <div className='text-2xl lg:text-3xl font-light mt-4 text-stone-50'>
            {data}{dataLabel == "Temperature" ? <span className='font-light'>°F</span> : '%'}
        </div>
    </div>
  )
}

export default Card