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
                    {title}
                </button> 

            ))}
            </div>
        </div>
    </div>
  )
}
