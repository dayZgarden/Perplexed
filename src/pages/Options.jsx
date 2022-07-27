import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import goku from '../../public/goku.png'

export default function Options() {
  const location = useLocation();
  const profile = useRef(location.state?.profile);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(profile);
  }, [profile]);

  return (
    //fade in the user
    <div className="text-white h-screen text-center flex  items-center bg-gradient-to-r from-black via-slate-900 to-black ">
      <div className="w-1/2 border-r-2 h-full flex flex-col items-center justify-center">
        <div className='invert w-[80%] text-center tracking-wider bg-transparent text-white brightness-0 font-extrabold text-[58px] border-4 border-gray-900 shadow-cool m-8 p-4 '>
          <h1 className="bg">Welcome {profile.current} </h1>
        </div>
          <figure className="border-4 w-[50%] h-[55%] bg-black rounded-full flex items-center justify-center">
            <img className="invert w-[90%] h-[90%] p-12" src={goku} alt="" />
          </figure>
          <div className="flex m-8 mb-16 space-x-8">
            <div className="p-4 border-4 font-bold">
              Points | 1500
            </div>
            <button className="hover:scale-105 active:scale-100 hover:bg-white hover:text-gray-900 transition-all duration-500 p-4 border-4 font-bold">
              Edit Profile
            </button>
          </div>
      </div>

      <div className="text-white flex flex-col h-screen justify-center items-center w-1/2">
        <div className="backdrop-blur-lg backdrop-opacity-70 h-full w-full flex flex-col items-center justify-center">
          <button
            onClick={() => navigate("/genres")}
            className="z-50 cursor-pointer 
            hover:scale-105 active:scale-95  transiton-all duration-300
           bg-orange-400 translate-x-[12%] rounded-[2%] w-2/3 text-[42px] m-6 font-extrabold text-gray-900 blur-[5%] hover:blur-none border-2 p-12 border-gray-900 overflow-hidden shadow-cool active:shadow-sm"
          >
            Start Playing
          </button>
          <button
            onClick={() => navigate("/leaderboards")}
            className="z-50 cursor-pointer 
            hover:scale-105 active:scale-95 m-6 transiton-all duration-300
           bg-purple-400 -translate-x-[7%] rounded-[11%] w-2/3 text-[42px] font-extrabold text-gray-900 blur-[5%] hover:blur-none border-2 p-12 border-gray-900 overflow-hidden shadow-cool active:shadow-sm"
          >
            View Leaderboards
          </button>
          <button
            onClick={() => navigate("/")}
            className="z-50 cursor-pointer 
            hover:scale-105 active:scale-95 m-6 transiton-all duration-300
           bg-yellow-300 translate-x-[5%] rounded-[25%] w-2/3 text-[42px] font-extrabold  text-gray-900 blur-[5%] hover:blur-none border-2 p-12 border-gray-900 overflow-hidden shadow-cool active:shadow-sm"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
