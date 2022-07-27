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
    <div className='h-screen w-full bg-dark bg-center bg-cover'>
        <div className='h-full backdrop-blur-lg'>
            <h1 className=' w-[80%] text-center tracking-wider bg-transparent text-white brightness-0  font-extrabold text-[58px] border-4 border-gray-900 shadow-cool uppercase p-4
            mx-auto translate-y-[15%] mb-8'>Choose any Genre</h1>
            <div className='h-4/5 flex justify-center items-center flex-wrap'>
            {Object.entries(requests).map(([key, {title, url}]) => (
                // <button key={key} onClick={()=>handleClick(url, title)}
            <div className='max-w-[180px] h-[180px] w-full bg-general bg-center bg-cover m-2 
                shadow-cool active:shadow-sm group hover:scale-105 rounded-[7%] active:scale-95 transiton-all duration-500'>
                <div key={key} onClick={()=>handleClick(url, title)} className='cursor-pointer tracking-wide w-full h-full'></div>
                <h1 className=' font-extrabold text-center mt-1 text-[16px] opacity-0 group-hover:opacity-100 border-4 bg-white text-gray-900 border-gray-900  p-[6px]'>{title}</h1>
            </div>
            ))}
            </div>
        </div>
    </div>
  )
}
