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
    <div className='h-full bg-blackish'>
        <div className='h-full'>
            <h1 className='text-white text-center pt-12 text-[52px] font-bold, tracking-wide uppercase'>Choose any Genre</h1>
            <div className='h-4/5 m-6 flex justify-center items-center flex-wrap'>
            {Object.entries(requests).map(([key, {title, url}]) => (
                // <button key={key} onClick={()=>handleClick(url, title)}
                <div key={key} onClick={()=>handleClick(url, title)} className='cursor-pointer 
                hover:scale-105 active:scale-95 transiton-all duration-500
               bg-white rounded-[50%] w-1/4 h-[460px] tracking-wide 
               blur-[5%] bg-general bg-center bg-cover
               hover:blur-none m-6 overflow-hidden shadow-cool active:shadow-sm group '>
                <div className=' h-full w-full text-[56px] font-extrabold flex items-center 
                group-hover:opacity-100 text-gray-900 group-hover:backdrop-blur-lg opacity-[15%] justify-center text-center transition-all duration-300'>
                    {title}
                </div> 
            </div>
            ))}
            </div>
        </div>
    </div>
  )
}
