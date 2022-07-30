import {EyeIcon,  MapIcon,  MoonIcon,  PencilIcon,  PuzzleIcon,  ScaleIcon,  UserIcon,  XCircleIcon,  } from '@heroicons/react/solid';
import { UsersIcon } from '@heroicons/react/solid';
import { sendSignInLinkToEmail } from 'firebase/auth';
import React, {useState, useEffect, useRef} from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import Question from '../components/Question';
import {  addDoc, doc, updateDoc, query, where, getDocs, getDoc } from 'firebase/firestore';
import auth from '../firebase/fire';
import { pointsRef } from '../utils/firestore.collections';
import { db } from '../firebase/fire';

export default function Results() {

    const location = useLocation();
    const navigate = useNavigate();
    const points = parseInt(location.state.uPoints);
    const score = parseInt(location.state.uScore);
    const questions = (location.state.all)?.split('tempword').splice(0,11)
    const choices = (location.state.choices)?.split('tempword').splice(0,12)
    const rights = (location.state.rights)?.split('tempword').splice(0,11)
    const [route, setRoute] = useState(false)
    const [temp, setTemp] = useState(0);


    const[eye, setEye] = useState(false)
    const [loading, setLoading] = useState(true);

    function toggleResults() {
      setEye(!eye)
    }

    console.log(auth.currentUser)
    console.log(auth.currentUser.uid)

    useEffect(() => {
      setTimeout(() => {
        setLoading(false)
      }, 1000)
      // storePoints();
      updatePost();
    }, [])

    async function updatePost() {
      const pointCollectionRef =  query(
        pointsRef,
        where('uid', '==', auth?.currentUser?.uid)
      )
      const { docs } = await getDocs(pointCollectionRef)
      if(docs.length === 0){
        console.log('new stored post')
        storePoints();
      }
      else{
        const postRef = doc(pointsRef,  docs[0]?.id);
        const postSnap = await getDoc(postRef)
        console.log(postSnap.data())
        console.log('update')
        const post = {
          ...postSnap?.data(),
          points: postSnap?.data().points + points,
        }
        updateDoc(postRef, post)
      }
      
    }
    
    function storePoints() {
      addDoc(pointsRef, 
        {
          name: auth?.currentUser?.displayName, 
          points: points,
          uid: auth?.currentUser?.uid,
        })
          .then(res => { console.log(res.id)}
          ).catch(err => console.log(err.message))
    }
    
    useEffect(() => {
      const docRef = doc(pointsRef, '1435Afustw62Pz5yow4l')
      updateDoc(docRef, {points: (points + 1)}).then(res => { console.log(res?.id)}).catch(err => console.log(err.message))
    }, [])

  return (
    <div className=' h-screen bg-idk2 bg-center bg-cover min-h-full'>
      {!loading && <div className='flex flex-col h-full'>
        {!eye &&
        <div className='text-white backdrop-blur-xl overflow-scroll md:overflow-hidden scrollbar-hide h-full p-4 backdrop-opacity-70'>
            <div className='flex justify-center space-x-8'>
              <button onClick={() => navigate('/leaderboards')} className='z-50 cursor-pointer 
              hover:scale-105 active:scale-95  transiton-all duration-500 
              bg-purple-300 rounded-[22%] text-gray-900 blur-[5%] hover:blur-none border-2 p-1 border-gray-900 overflow-hidden shadow-cool w-28 h-28 active:shadow-sm'><ScaleIcon/></button>
              <button onClick={toggleResults} className='z-50 cursor-pointer 
              hover:scale-105 active:scale-95  transiton-all duration-500 translate-y-5
               bg-yellow-300 rounded-[22%] text-gray-900 blur-[5%] hover:blur-none border-2 p-1 border-gray-900 overflow-hidden shadow-cool w-28 h-28 active:shadow-sm'><EyeIcon/></button>
              <button onClick={() => navigate('/options')} className='z-50 cursor-pointer 
              hover:scale-105 active:scale-95  transiton-all duration-500
               bg-orange-400 rounded-[22%] text-gray-900 blur-[5%] hover:blur-none border-2 p-1 border-gray-900 overflow-hidden shadow-cool w-28 h-28 active:shadow-sm'><UserIcon/></button>
            </div>
          <div className='flex md:flex-row flex-col items-center justify-center h-full p-4 max-w-[1200px] w-full mx-auto'>
            <div className='flex-col  items-center tracking-wide font-bold rounded-full md:rounded-[25%] lg:rounded-[50%] bg-purple-300 text-gray-900 sm:w-[80%] md:max-w-[50%] p-8 md:p-16 flex 
            justify-center h-[40%] md:mb-24 w-[90%] sm:h-[50%] md:h-[60%] lg:h-[70%] mt-20 border-4 border-gray-900 text-[64px] md:text-[100px] md:mr-16'>
              <div>
                {score}
              </div>
              <div className='w-full border-b-4 border-gray-900'></div>
              <div>
                10
              </div>
            </div>
            <div className='flex flex-col justify-center h-[70%] items-center w-[80%] md:w-1/2'>
            <h1 className='tracking-wider sm:text-start text-center sm:mt-0 mt-8 bg-orange-400 text-gray-900 font-bold text-[36px] border-4 border-gray-900 shadow-cool mb-8 p-8 '>Points scored: {points}</h1>
             <button onClick={() => navigate('/genres')} className='z-50 cursor-pointer 
            hover:scale-105 active:scale-95  transiton-all duration-300 mb-8 sm:mb-0
           bg-yellow-300 rounded-[22%] max-w-[480px] text-[42px] font-bold w-full text-gray-900 blur-[5%] hover:blur-none border-2 p-12 border-gray-900 overflow-hidden shadow-cool active:shadow-sm'>Play Again</button>
            </div>
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
