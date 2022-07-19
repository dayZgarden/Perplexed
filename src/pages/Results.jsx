import React from 'react'
import { useLocation, Link } from 'react-router-dom'

export default function Results() {

    const location = useLocation();
    const points = parseInt(location.state.uPoints);
    const score = parseInt(location.state.uScore);
    console.log(points);
    console.log(score);

  return (
    <div className='bg-indigo-900 h-screen'>
        <div className='text-white flex-col flex items-center justify-center h-full'>
            <h1 className='tracking-wide font-bold text-[36px]'>Your points: {points}</h1>
            <p className='tracking-wide font-bold text-[36px]'>Your score: {score} / 10</p>
            <Link to={{
                pathname:'/'
            }} className='
            cursor-pointer hover:scale-110 active:scale-90 p-4 m-2 
            border text-white transition-all duration-300
            '>Play Again</Link>
        </div>
    </div>
  )
}
