import {EyeIcon,  MapIcon,  MoonIcon,  PencilIcon,  PuzzleIcon,  ScaleIcon,  UserIcon,  XCircleIcon,  } from '@heroicons/react/solid';
import { UsersIcon } from '@heroicons/react/solid';
import { sendSignInLinkToEmail } from 'firebase/auth';
import React, {useState, useEffect} from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import Question from '../components/Question';

export default function Results() {

    const location = useLocation();
    const navigate = useNavigate();
    const points = parseInt(location.state.uPoints);
    const score = parseInt(location.state.uScore);
    const questions = (location.state.all).split('?').splice(1,10)
    const choices = (location.state.choices).replaceAll(';',',').split(',').splice(3,11)
    const rights = (location.state.rights).split(',').splice(3,11)
    console.log(rights)
    console.log(choices)
    console.log(questions)

    const[eye, setEye] = useState(false)
    const [loading, setLoading] = useState(true);

    function toggleResults() {
      setEye(!eye)
    }

    useEffect(() => {
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }, [])


  return (
    <div className='scrollbar-hide h-screen bg-idk2 bg-center bg-cover min-h-full'>
      {!loading && <div className='flex flex-col justify-evenly h-full'>
        {!eye &&
        <div className='text-white backdrop-blur-xl h-full p-4 backdrop-opacity-70'>
          <div className='flex justify-center items-center h-full p-4 max-w-[1200px] w-full mx-auto'>
            <div className='flex-col tracking-wide font-bold rounded-[50%] bg-purple-300 text-gray-900 w-[50%] p-16 flex items-center
            justify-center  h-[65%] mt-20 border-4 border-gray-900 text-[86px] mr-16'>
              <div>
                {score}
              </div>
              <div className='w-full border-b-4 border-gray-900'></div>
              <div>
                10
              </div>
            </div>
            <div className='flex flex-col justify-evenly items-center w-1/2'>
            <h1 className='tracking-wider bg-orange-400 text-gray-900 font-bold text-[36px] border-4 border-gray-900 shadow-cool mb-8 p-4 '>Points scored: {points}</h1>
             <button onClick={() => navigate('/genres')} className='z-50 cursor-pointer 
            hover:scale-105 active:scale-95  transiton-all duration-300
           bg-yellow-300 rounded-[22%] max-w-[480px] text-[42px] font-bold w-full text-gray-900 blur-[5%] hover:blur-none border-2 p-12 border-gray-900 overflow-hidden flex-1 shadow-cool active:shadow-sm'>Play Again</button>
            </div>
            <button onClick={toggleResults} className='z-50 cursor-pointer 
            hover:scale-105 active:scale-95  transiton-all duration-500
            fixed bg-yellow-300 rounded-[22%] text-gray-900 blur-[5%] hover:blur-none border-2 p-1 border-gray-900 overflow-hidden flex-1 shadow-cool w-20 h-20 active:shadow-sm  top-14 left-[50%] -translate-x-1/2'><EyeIcon/></button>
            <button onClick={() => navigate('/leaderboards')} className='z-50 cursor-pointer 
            hover:scale-105 active:scale-95  transiton-all duration-500
            fixed bg-purple-300 rounded-[22%] text-gray-900 blur-[5%] hover:blur-none border-2 p-1 border-gray-900 overflow-hidden flex-1 shadow-cool w-20 h-20 active:shadow-sm  top-10 left-[57%] -translate-x-1/2'><ScaleIcon/></button>
            <button onClick={() => navigate('/options')} className='z-50 cursor-pointer 
            hover:scale-105 active:scale-95  transiton-all duration-500
            fixed bg-orange-400 rounded-[22%] text-gray-900 blur-[5%] hover:blur-none border-2 p-1 border-gray-900 overflow-hidden flex-1 shadow-cool w-20 h-20 active:shadow-sm  top-10 left-[43%] -translate-x-1/2'><UserIcon/></button>
            </div>
        </div>}
        </div>}
        {eye && <div className='bg-black absolute inset-0 overflow-scroll scrollbar-hide'>
        <button onClick={toggleResults} className='z-50 cursor-pointer 
          hover:scale-105 active:scale-95 transiton-all duration-500
           fixed text-white w-16 h-16 top-5 right-5 -translate-x-50%'><XCircleIcon/></button>
          <div className='text-white flex flex-col '>
            {
              <Question question= {questions} choice={choices} right={rights}/>
            }
            </div>
        </div>}
        {loading && 
        <div className='h-full w-full flex items-center justify-center bg-gradient-to-r from-black via-slate-900 to-black'>
          <div className='relative h-44 w-44 animate-spin  rounded-full bg-gradient-to-r from-pink-600 via-indigo-600 to bg-green-600'>
              <div className='absolute top-1/2 left-1/2 rounded-full -translate-x-1/2 -translate-y-1/2 transform w-40 h-40 bg-slate-900'>
              </div>
          </div>
        </div>}
    </div>
  )
}
