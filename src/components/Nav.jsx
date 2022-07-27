import React from 'react'

export default function Nav() {
  return (
    <div className='bg-transparent h-[50px] w-full relative'>
        <div className='w-[95%]' >
            <div className='flex items-center w-full justify-between'>
                <div className='flex ml-6 space-x-1 items-center'>
                    <img className='ml-4 invert contain w-20 h-20' src="https://day-ztracker.vercel.app/assets/icons8-flat-60.png" alt="" />
                    <h1 className='text-white py-6 px-4 m-4  font-extrabold tracking-wide
                    text-[48px]'>
                        dayZtrivia
                    </h1>
                </div>
                <button className='font-bold text-center break-words z-50
                    hover:scale-[103%] cursor-pointer bg-purple-400 transiton-all duration-300
                    w-[240px] rounded-[31%] text-[28px] text-gray-900 border-2 py-6 px-4 border-gray-900 overflow-hidden shadow-cool active:shadow-lg m-4'
                    >
                    Sign In
                </button>
            </div>
        </div>
    </div>
  )
}
