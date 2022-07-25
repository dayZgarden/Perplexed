import { sendSignInLinkToEmail } from 'firebase/auth';
import React from 'react'
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

  return (
    <div className='h-screen bg-idk2 bg-center bg-cover min-h-full'>
        <div className='text-white backdrop-blur-xl backdrop-opacity-70 flex-col flex items-center justify-center h-full'>
            <h1 className='tracking-wide font-bold text-[36px]'>Your points: {points}</h1>
            <p className='tracking-wide font-bold text-[36px]'>Your score: {score} / 10</p>
            <Link to = {{
              pathname: '/genres'
            }} className="active:scale-95 hover:scale-105 transition-all duration-500 relative inline-block text-lg group">
              <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
              <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-yellow-300"></span>
              <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
              <span className="relative text-[24px] font-bold tracking-wide">Play Again</span></span>
              <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
            </Link>
            <div className='absolute bottom-5 left-50% translate-x--50%'> - Details - </div>
        </div>
        <div className='text-white flex flex-col m-2'>
          <div>
            {
              <Question question= {questions} choice={choices} right={rights}/>
            }
            </div>
          {/* <div>This is your answer component</div>
          <div>This is correct answer component</div> */}
          
        </div>
    </div>
  )
}
