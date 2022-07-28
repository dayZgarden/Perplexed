import React from 'react'

export default function Card({option, picked}) {
  console.log(option)
  return (
    <div className='w-1/3 max-w-[700px] active:animate-ping-once relative m-4 flex flex-col  justify-center items-center'>
        <div className='
          relative w-full flex items-center flex-wrap active:scale-95 hover:scale-105 transition-all duration-300 rounded-[20%] leading-none'>
            <input type="button" className='break-words z-50 odd:bg-purple-300 cursor-pointer 
            hover:scale-[103%] m-2 hover:bg-orange-400 active:scale-100  transiton-all duration-300
              rounded-[11%] flex-1 text-[42px] font-bold w-1/2 text-gray-900 border-2 p-12 border-gray-900 overflow-hidden shadow-cool active:shadow-sm' 
              value={option} onClick={picked} placeholder={option?.replaceAll(';','').replaceAll('&','').replaceAll('#','').replaceAll('quot','"').replaceAll('039',"'")}/>
        </div>
    </div>
  )
}
