import React from 'react'
import requests from '../../requests'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react'

export default function Genres() {
    const navigate = useNavigate();

    function handleClick(url, title) {
        navigate('/landing', 
        {
            state:{
                query: url,
                title: title
            }
          })
    }


  return (
    <div className='h-full'>
        <div className='h-full'>
            <h1 className='text-white text-center pt-12 text-[52px] font-bold, tracking-wide uppercase'>Choose any Genre</h1>
            <div className='h-4/5 my-6 flex justify-center items-center flex-wrap'>
            {Object.entries(requests).map(([key, {title, url}]) => (
                <button key={key} onClick={()=>handleClick(url, title)}
                className='relative px-5 py-3 overflow-hidden  order shadow-inner group bg-white cursor-pointer p-10 bg-transparent odd:border-b-2 even:border-t-2 text-white tracking-wide hover:text-black hover:bg-white rounded-[17%] hover:scale-105 active:scale-95
                transition-all duration-500 m-6  active:text-white w-1/4 text-[36px] font-bold'>
                    <span class="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
                    <span class="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
                    <span class="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                    <span class="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                    <span class="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
                    <span class="relative transition-colors duration-300 delay-200 group-hover:text-white ease">{title}</span>
                </button>

            ))}
            </div>
        </div>
    </div>
  )
}
