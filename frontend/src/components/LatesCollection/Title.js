import React from 'react'

const Title = ({text1,text2}) => {
  return (
    <div className='inline-flex gap-2 items-center mb-3'>
    <div className='flex items-center gap-1'>
      <p className='text-gray-700 font-medium'>{text1}</p>
      <p className='text-gray-500'>{text2}</p>
    </div>
    <div className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700'></div>
  </div>
  )
}

export default Title
