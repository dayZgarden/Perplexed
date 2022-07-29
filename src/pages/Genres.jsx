import React from 'react'
import requests from '../utils/requests'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react'
import Genre from '../components/Genre';

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
    <div className='h-[120vh] w-full bg-gradient-to-r from-gray-500 via-indigo-200 to-slate-300'>
        <div className='h-full backdrop-blur-lg'>
            <h1 className=' w-[80%] text-center tracking-wider bg-transparent text-white brightness-0  font-extrabold text-[58px] border-4 border-gray-900 shadow-cool uppercase p-4
            mx-auto translate-y-[15%] mb-8'>Choose any Genre</h1>
            <div className='p-4 
             flex justify-center items-center flex-wrap'>
            {Object.entries(requests).map(([key, {title, url, image}]) => (
                <Genre key = {key} handleClick={handleClick} title = {title} url = {url} image = {image}/>
            ))}
            </div>
        </div>
    </div>
  )
}
