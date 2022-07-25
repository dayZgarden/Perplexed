import React from 'react'

export default function Card() {
  return (
    <div className='w-[700px] max-w-full active:animate-ping-once relative m-4 flex flex-col  justify-center items-center'>
        <div className=' 
            relative w-full flex items-center break-all  bg-gradient-to-b from-orange-300 via-pink-600 to bg-blue-600 flex-wrap hover:bg-gradient-to-b active:scale-95 hover:scale-105 transition-all duration-300 bg-center rounded-[20%] leading-none'>
            <input type="button" className='text-[42px] text-white transition-all duration-300 flex-1 cursor-pointer brightness-105 w-full p-20 m-2' value={option} onClick={picked} placeholder={option?.replaceAll(';','').replaceAll('&','').replaceAll('#','').replaceAll('quot','"').replaceAll('039',"'")}/>
        </div>
    </div>
  )
}
