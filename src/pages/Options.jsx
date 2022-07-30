import React, { useEffect, useRef, useState } from "react";
import { useNavigate,  } from "react-router-dom";
import goku from '../../public/goku.png'
import head from '../../public/head.svg'
import  auth  from '../firebase/fire'
import logout from "../utils/logout";
import { collection, getDocs, getDoc, doc, query, where } from 'firebase/firestore'
import { db } from "../firebase/fire";
import { pointsRef } from "../utils/firestore.collections";

export default function Options() {
  const navigate = useNavigate();
  console.log(auth.currentUser);

  const [score, setScore] = useState(0);

  function handleLogout(){
    logout(auth)
      navigate('/', {
        state: {
          check: true
        }
      })
}

async function getPostByUid() {
  const pointCollectionRef = await query(
    pointsRef,
    where('uid', '==', auth?.currentUser?.uid)
  )
  const {docs} = await getDocs(pointCollectionRef)
  console.log(docs.map(doc => doc.data()))
  const data = docs.map(doc => doc.data())
  setScore(data[0]?.points)
}

  useEffect(() => {
    getPostByUid()
  }, [])

  return (
    //fade in the user
    <div className="text-white overflow-scroll scrollbar-hide flex-col md:flex-row h-screen text-center flex  items-center bg-gradient-to-r from-black via-slate-900 to-black ">
      <div className="md:w-1/2 w-[60%] md:border-r-2 h-full flex flex-col items-center justify-center">
        <div className='invert lg:w-[65%] text-center tracking-wider bg-transparent text-white brightness-0 font-extrabold text-[58px] border-4 border-gray-900 shadow-cool m-8 p-4 '>
          <h1 className="flex-1"> {auth.currentUser?.displayName} </h1>
        </div>
          <figure className="border-4 w-[100%] h-full md:h-[30%] lg:h-[40%] xl:h-[50%] md:w-[60%] xl:w-[50%]  bg-black rounded-full flex items-center justify-center">
            <img className="invert h-[100%] w-[90%] sm:h-[90%] p-12" src={goku} alt="" />
          </figure>
          <div className="flex m-8 mb-16">
            <button className="hover:scale-105 text-[20px] w-[48%] m-2 active:scale-100 hover:bg-white hover:text-gray-900 transition-all duration-500 px-8 py-4 border-4 font-bold">
              Edit Profile
            </button>
            <button className="hover:scale-105 text-[20px] cursor-default w-[48%] m-2 active:scale-100 hover:bg-white hover:text-gray-900 transition-all duration-500 px-8 py-4 border-4 font-bold">
              Points: {score || '0'}
            </button>
          </div>
      </div>

      <div className="text-white flex flex-col h-screen justify-center items-center md:w-1/2 w-[60%]">
        <div className="backdrop-blur-lg backdrop-opacity-70 h-full w-full flex flex-col items-center justify-center">
          <button
            onClick={() => navigate("/genres")}
            className="flex items-center justify-center z-50 cursor-pointer 
            hover:scale-105 active:scale-95  transiton-all duration-300
           bg-orange-400 md:translate-x-[12%] rounded-[2%] w-[100%]  md:w-2/3 text-[28px]  sm:text-[42px] m-6 font-extrabold text-gray-900 blur-[5%] hover:blur-none border-2 p-8 md:p-12 border-gray-900 overflow-hidden shadow-cool active:shadow-sm"
          >
            Start Playing
          </button>
          <button
            onClick={() => navigate("/leaderboards")}
            className="z-50 break-words sm:break-words cursor-pointer 
            hover:scale-105 flex items-center justify-center active:scale-95 m-6 transiton-all duration-300
           bg-purple-400 md:-translate-x-[7%] rounded-[11%] w-[100%]  md:w-2/3 text-[28px]  sm:text-[42px] font-extrabold text-gray-900 blur-[5%] hover:blur-none border-2 p-8 md:p-12 border-gray-900 overflow-hidden shadow-cool active:shadow-sm"
          >
            View Leaderboards
          </button>
          <button
            onClick={handleLogout}
            className="z-50 cursor-pointer flex items-center justify-center 
            hover:scale-105 active:scale-95 m-6 transiton-all duration-300
           bg-yellow-300 md:translate-x-[5%] rounded-[25%] w-[100%]  md:w-2/3 text-[28px]  sm:text-[42px] font-extrabold  text-gray-900 blur-[5%] hover:blur-none border-2 p-12 border-gray-900 overflow-hidden shadow-cool active:shadow-sm"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
