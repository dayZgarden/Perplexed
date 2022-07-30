import { HomeIcon } from '@heroicons/react/solid'
import React, { useState, useEffect } from 'react'
import goku from '../../public/goku.png'
import Nav from '../components/Nav'
import { useNavigate } from 'react-router-dom'
import {  addDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import auth from '../firebase/fire';
import { pointsRef } from '../utils/firestore.collections';
import { db } from '../firebase/fire';
import Rank from '../components/Rank'

export default function Leaderboards() {

  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [allPoints, setAllPoints] = useState([]);
  const [sorted, setSorted] = useState([]);
  const [generated, setGenerated] = useState(0);
  const [rank, setRank] = useState(0)

  async function getAllUserPoints() {
    const { docs } = await getDocs(pointsRef)
    const points = docs.map((elem) => ({...elem.data(), id: elem.id}))
    console.log(points)
    points.map((user) => {
      setAllPoints(allPoints => [...allPoints, user])
    })
  }

  useEffect(() => {
    getAllUserPoints()
  },[])

  useEffect(() => {
    console.log(allPoints)
    allPoints.map((user) => {
      (auth.currentUser.displayName === user.name) && setScore(user?.points)
    })
    const b = allPoints.sort((a,b) => parseFloat(b.points) - parseFloat(a.points))
    console.log(b)

    for(let i = 0; i < allPoints.length; i++){
      if(allPoints[i].name === auth?.currentUser?.displayName){
        setRank(i+1)
        break
      }
    }
  },[allPoints])

  console.log(allPoints)

  return (
    <div className='h-screen bg-gradient-to-r from-black via-slate-900 to-black'>
      <div className='group fixed flex flex-col items-center top-4'>
        <button onClick={() => navigate('/options')} className=' hover:scale-125
        active:scale-110 transition-all duration-500 text-white w-16 h-16'>
          <HomeIcon/>
        </button>
        <h1 className='mt-2 text-white opacity-0 group-hover:opacity-100 font-bold tracking-widest  transition-all duration-300'>Back to Home</h1>
      </div>
      <div className='h-full w-full flex  items-center justify-center'>
        <div className='bg-transparent w-[90%] sm:w-[60%] h-[80%] rounded-lg group perspective'>
          <div className='cursor-pointer shadow-cool h-full w-full duration-1000 relative 
          preserve-3d group-hover:my-rotate-y-180'>
            <div className='absolute backface-hidden bg-white border-blue-500 border-4 w-full h-full'>
              <div className='w-full h-full flex flex-col items-center justify-center font-extrabold text-[56px] tracking-wide'>
                <figure className="border-4 w-[85%] h-[50%] sm:w-[80%] sm:h-[55%] md:w-[60%] md:h-[55%] xl:h-[60%] xl:w-[45%]  bg-black rounded-full flex items-center justify-center">
                  <img className="invert w-[90%] xl:w-[80%] h-[100%] p-12" src={goku} alt="" />
                </figure>
                <h1 className='text-center'>{auth?.currentUser?.displayName}</h1> 
                <div className='text-[24px] font-bold
                 tracking-normal flex justify-center'>Rank {rank} : {score} points</div>
              </div>
            </div>
            <div className='absolute my-rotate-y-180 backface-hidden w-full h-full border-purple-400
             border-4 bg-gray-50'>
              <div className='font-bold h-full text-[20px] tracking-wide flex flex-col  items-center'>
                  <h1 className='text-center text-[28px] mt-2 mb-8 break-words font-extrabold tracking-wide w-[80%] mx-auto shadow-cool border-2 border-gray-900 brightness-0'>LEADERBOARDS</h1>
                <div className='h-[65%] flex flex-col'>
                  <div className='flex flex-wrap scrollbar-hide overflow-scroll items-center justify-center h-full '>
                    {allPoints.map((user) => (
                      <Rank user={user}/>
                    )).slice(generated, generated + 10)}
                </div>
                </div>
                <div className='flex justify-center'>
                  <button onClick={() => setGenerated(generated + 10)} className='opacity-100 w-[30%] p-4 lg:px-6 lg:py-2 bg-transparent shadow-cool rounded-lg
                  border-2 border-gray-900 text-black brightness-0 text-[24px] uppercase absolute
                  translate-x-[80%] -bottom-20 delay-500 duration-1000 group-hover:bottom-10 scale-0 group-hover:scale-75 sm:group-hover:scale-125'>Load more</button>
                  {generated >= 10 ? (<button onClick={() => setGenerated(generated - 10)} className='opacity-100 w-[30%] p-4 lg:px-6 lg:py-2 bg-transparent shadow-cool rounded-lg
                  -translate-x-[80%] border-2 border-gray-900 text-black brightness-0 text-[24px] uppercase absolute
                  -bottom-20 delay-500 duration-1000 group-hover:bottom-10 scale-0 group-hover:scale-75 sm:group-hover:scale-125'>Go back</button>)
                : (<button disabled className='opacity-60 hover:cursor-not-allowed w-[30%] p-4 lg:px-6 lg:py-2 bg-transparent shadow-cool rounded-lg
                -translate-x-[80%] border-2 border-gray-900 text-black brightness-0 text-[24px] uppercase absolute
                -bottom-20 delay-500 duration-1000 group-hover:bottom-10 scale-0 group-hover:scale-75 sm:group-hover:scale-125'>Go back</button>)
                }
                </div>
            </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}
