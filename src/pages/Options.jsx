import React, {useEffect, useRef} from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom';

export default function Options() {
    const location = useLocation();
    const profile = useRef(location.state?.profile)
    const navigate = useNavigate();

    useEffect(() => {
        console.log(profile)
    }, [profile])

  return (
    //fade in the user
    <div className='text-white h-screen text-center flex  items-center'>
        <h1 className='m-2 text-[48px] w-1/2'>Welcome, {profile.current} </h1>
        <div className='text-white flex flex-col h-screen justify-center items-center bg-gradient-to-l from-gray-600 via-slate-400 to-stone-500 bg-center bg-cover w-1/2'>
            <Link to = {{
              pathname: '/genres'
            }} className="w-1/2 m-4 active:scale-95 hover:scale-105 transition-all duration-500 relative inline-block text-lg group">
              <span className="h-[100px] flex items-center relative z-10  px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg">
              <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gradient-to-t from-slate-600 via-purple-400 to-indigo-400 "></span>
              <span className="w-full  relative text-[24px] font-bold tracking-wide">Start Playing</span></span>
            </Link>
            <Link to = {{
              pathname: '/genres'
            }} className="w-1/2 m-4 active:scale-95 hover:scale-105 transition-all duration-500 relative inline-block text-lg group">
              <span className="h-[100px] flex items-center relative z-10  px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg">
              <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gradient-to-r from-slate-600 via-slate-400"></span>
              <span className="w-full relative text-[24px] font-bold tracking-wide">View Account</span></span>
            </Link>
            <Link to = {{
              pathname: '/genres'
            }} className="w-1/2 m-4 active:scale-95 hover:scale-105 transition-all duration-500 relative inline-block text-lg group">
              <span className="h-[100px] flex items-center relative z-10  px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg">
              <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gradient-to-b from-slate-600 via-purple-400 to-indigo-400"></span>
              <span className="w-full relative text-[24px] font-bold tracking-wide">View Leaderboards</span></span>
            </Link>
            <Link to = {{
              pathname: '/genres'
            }} className="w-1/2 m-4 active:scale-95 hover:scale-105 transition-all duration-500 relative inline-block text-lg group">
              <span className="h-[100px] flex items-center relative z-10  px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg">
              <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gradient-to-l from-slate-600 via-purple-400 to-indigo-400"></span>
              <span className="w-full relative text-[24px] font-bold tracking-wide">Logout</span></span>
            </Link>
        </div>
    </div>
  )
}
