import { HomeIcon } from '@heroicons/react/solid'
import React from 'react'
import goku from '../../public/goku.png'
import Nav from '../components/Nav'
import { useNavigate } from 'react-router-dom'


export default function Leaderboards() {

  const navigate = useNavigate();

  return (
    <div className='h-screen bg-gradient-to-r from-black via-slate-900 to-black'>
      <div className='group fixed top-12 left-12 flex flex-col items-center'>
        <button onClick={() => navigate('/genres')} className=' hover:scale-125
        active:scale-110 transition-all duration-500 text-white w-20 h-20 '>
          <HomeIcon/>
        </button>
        <h1 className='mt-2 text-white opacity-0 group-hover:opacity-100 font-bold tracking-widest  transition-all duration-300'>Back to Home</h1>
      </div>
      <div className='h-full w-full flex  items-center justify-center'>
        <div className='bg-transparent w-[60%] h-[80%] rounded-lg group perspective'>
          <div className='cursor-pointer shadow-cool h-full w-full duration-1000 relative 
          preserve-3d group-hover:my-rotate-y-180'>
            <div className='absolute backface-hidden bg-white border-blue-500 border-4 w-full h-full'>
              <div className='w-full h-full flex flex-col items-center justify-center font-extrabold text-[56px] tracking-wide'>
                <figure className="border-4 w-[30%] h-[50%] bg-black rounded-full flex items-center justify-center">
                  <img className="invert w-[100%] h-[100%] p-12" src={goku} alt="" />
                </figure>
                <h1 className=''>username | 1500 points</h1>
                <h1 className=''>Rank | 42</h1>
              </div>
            </div>
            <div className='absolute my-rotate-y-180 backface-hidden w-full h-full border-purple-400
             border-4 bg-gray-50 font-bold text-[20px] tracking-wide flex flex-col justify-center items-center'>
              <h1 className='text-center text-[36px] mb-8 p-2 font-extrabold tracking-wide w-[50%] mx-auto shadow-cool border-2 border-gray-900 brightness-0'>LEADERBOARDS</h1>
              <div className='flex flex-wrap justify-center mb-8'>
                <div className='border-2 p-2 w-[48%] m-1  border-black'>1. DoggyDude42 | 20000 points</div>
                <div className='border-2 p-2 w-[48%] m-1 border-black'>2. CatBro55 | 19000 points</div>
                <div className='border-2 p-2 w-[48%] m-1 border-black'>3. Ninja | 18000 points</div>
                <div className='border-2 p-2 w-[48%] m-1 border-black'>4. NickAtNyte | 17000 points</div>
                <div className='border-2 p-2 w-[48%] m-1 border-black'>5. XxProZxXz | 16000 points</div>
                <div className='border-2 p-2 w-[48%] m-1 border-black'>6. ULTRAxF1RE | 15000 points</div>
                <div className='border-2 p-2 w-[48%] m-1 border-black'>7. MOLT | 14000 points</div>
                <div className='border-2 p-2 w-[48%] m-1 border-black'>8. KevinDurantOW | 13000 points</div>
                <div className='border-2 p-2 w-[48%] m-1 border-black'>9. Pink | 12000 points</div>
                <div className='border-2 p-2 w-[48%] m-1 border-black'>10. Woofwoof1 | 11000 points</div>
              </div>
              <button onClick={() => console.log('a')} className=' w-[40%]  px-6 py-2 bg-transparent shadow-cool rounded-lg
              border-2 border-gray-900 text-black brightness-0 text-[24px] uppercase absolute
               -bottom-20 delay-500 duration-1000 group-hover:bottom-6 scale-0 group-hover:scale-125'>Load more</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
