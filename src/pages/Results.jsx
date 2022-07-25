import {EyeIcon,  MapIcon,  MoonIcon,  PencilIcon,  PuzzleIcon,  ScaleIcon,  UserIcon,  XCircleIcon,  } from '@heroicons/react/solid';
import { UsersIcon } from '@heroicons/react/solid';
import { sendSignInLinkToEmail } from 'firebase/auth';
import React, {useState} from 'react'
import { useLocation, Link } from 'react-router-dom'
import Question from '../components/Question';

export default function Results() {

    const location = useLocation();
    const points = parseInt(location.state.uPoints);
    const score = parseInt(location.state.uScore);
    const questions = (location.state.all).split('?').splice(1,10)
    const choices = (location.state.choices).replaceAll(';',',').split(',').splice(2,10)
    const rights = (location.state.rights).split(',').splice(2,10)
    console.log(rights)
    console.log(choices)
    console.log(questions)

    const[eye, setEye] = useState(false)

    function toggleResults() {
      setEye(!eye)
    }

  return (
    <div className='scrollbar-hide h-screen bg-idk2 bg-center bg-cover min-h-full'>
      <div className='flex flex-col justify-evenly h-full'>
        {!eye &&<div className='text-white backdrop-blur-xl justify-evenly  backdrop-opacity-70 flex-col flex items-center h-full'>
            {/* <h1 className='tracking-wide font-bold text-[36px]'>Your points: {points}</h1> */}
            <div className='flex-col tracking-wide font-bold rounded-[50%] bg-yellow-300 text-gray-900 w-[340px] p-16 flex items-center
            justify-center h-[340px] border-4 border-gray-900 text-[86px]'>
              <div>
                {score}
              </div>
              <div className='w-full border-b-2 border-gray-900'></div>
              <div>
                10
              </div>
            </div>
            <Link to = {{
              pathname: '/genres'
            }} className="active:scale-95 hover:scale-105 transition-all duration-500 relative inline-block text-lg group">
              <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
              <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-yellow-300"></span>
              <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
              <span className="relative text-[24px] font-bold tracking-wide">Play Again</span></span>
              <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
            </Link>
            <button onClick={toggleResults} className='z-50 cursor-pointer 
            hover:scale-105 active:scale-95  transiton-all duration-500
            fixed bg-yellow-300 rounded-[22%] text-gray-900 blur-[5%] hover:blur-none border-2 p-1 border-gray-900 overflow-hidden flex-1 shadow-cool w-20 h-20 active:shadow-sm  top-14 left-50% -translate-x-50%'><EyeIcon/></button>
            <button onClick={toggleResults} className='z-50 cursor-pointer 
            hover:scale-105 active:scale-95  transiton-all duration-500
            fixed bg-yellow-300 rounded-[22%] text-gray-900 blur-[5%] hover:blur-none border-2 p-1 border-gray-900 overflow-hidden flex-1 shadow-cool w-20 h-20 active:shadow-sm  top-10 left-[55%] -translate-x-50%'><ScaleIcon/></button>
            <button onClick={toggleResults} className='z-50 cursor-pointer 
            hover:scale-105 active:scale-95  transiton-all duration-500
            fixed bg-yellow-300 rounded-[22%] text-gray-900 blur-[5%] hover:blur-none border-2 p-1 border-gray-900 overflow-hidden flex-1 shadow-cool w-20 h-20 active:shadow-sm  top-10 left-[40%] -translate-x-50%'><UserIcon/></button>
        </div>}
        </div>
        {eye && <div className='bg-black absolute inset-0 overflow-scroll scrollbar-hide'>
        <button onClick={toggleResults} className='z-50 cursor-pointer 
          hover:scale-105 active:scale-95 transiton-all duration-500
           absolute text-white w-16 h-16 top-5 right-5 -translate-x-50%'><XCircleIcon/></button>
          <div className='text-white flex flex-col m-2'>
            {
              <Question question= {questions} choice={choices} right={rights}/>
            }
            </div>
        </div>}
    </div>
  )
}
