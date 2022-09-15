import React from 'react'

export default function Genre({url, title, handleClick, key, image}) {
  return (
    <div key={key} onClick={()=>handleClick(url, title)}  className='p-3 max-w-[40%] md:max-w-[25%] h-[180px] sm:h-[260px] xl:h-[380px] w-full m-4
        shadow-cool2 border-4  border-black cursor-pointer  active:shadow-sm group hover:scale-105  active:scale-95 transiton-all duration-500'>
        <img className='object-cover brightness-[70%] hover:brightness-[110%] transition-all duration-300 w-full border-4 border-black h-full' src={image} alt="" />
        <h1 className=' font-extrabold  text-center mt-1 text-[16px] z-50 opacity-0 group-hover:opacity-100 border-4 bg-white text-gray-900 border-gray-900  p-[6px]'>{title}</h1>
    </div>
  )
}
