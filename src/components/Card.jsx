import React from 'react'

export default function Card({option, picked}) {
  return (
    <div className='md:w-1/3 w-full breaks-words max-w-[700px] active:animate-ping-once relative m-2 flex justify-center items-center'>
        <div className='
          break-words relative w-full flex items-center flex-wrap active:scale-95 hover:scale-105 transition-all duration-300 rounded-[20%] leading-none'>
            <input type="button" className='break-words bg-purple-300 cursor-pointer 
              hover:scale-[103%] m-2 hover:bg-orange-400 active:scale-100  transiton-all duration-300
              rounded-[11%] flex-1 text-[28px] xl:text-[36px] font-extrabold w-1/2 text-gray-900 border-2 lg:p-10 lg:py-20 xl:p-10 xl:py-24 p-12 mb-2 border-gray-900  shadow-cool active:shadow-sm' 
              value={option} onClick={picked} placeholder={option?.replaceAll(';','').replaceAll('&','').replaceAll('#','').replaceAll('quot','"').replaceAll('039',"'")}/>
        </div>
    </div>
  )
}
