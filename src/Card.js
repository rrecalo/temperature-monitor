import React from 'react'

const Card = ({data, dataLabel, ...props}) => {
  return (
    <div className='w-1/2 sm:w-1/3 lg:w-1/3 xl:w-1/4 h-20 sm:h-32 bg-stone-900 bg-opacity-75 
    text-center font-normal text-stone-400 text-sm sm:text-lg lg:text-2xl p-4 rounded-2xl flex flex-col justify-around items-center'>
        {dataLabel}
        <div className='text-xl sm:text-2xl lg:text-3xl font-light mt-1 sm:mt-4 text-stone-50'>
            {data}{dataLabel === "Temperature" ? <span className='font-light'>°F</span> : '%'}
        </div>
    </div>
  )
}

export default Card