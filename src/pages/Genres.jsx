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
    <div className='h-[100vh] overflow-scroll scrollbar-hide w-full bg-[#FFD9C6]'>
        <div className='h-full backdrop-blur-lg'>
            <h1 className=' w-[60%] text-center tracking-wider bg-transparent text-black   font-extrabold text-[58px] border-4 border-black shadow-cool2 uppercase p-4
            mx-auto translate-y-[15%] mb-12 sm:mb-8'>Choose any Genre</h1>
            <div className='p-4 
             flex justify-center items-center flex-wrap bg-transparent'>
            {Object.entries(requests).map(([key, {title, url, image}]) => (
                <Genre key = {key} handleClick={handleClick} title = {title} url = {url} image = {image}/>
            ))}
            </div>
        </div>
    </div>
  )
}
