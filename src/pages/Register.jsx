import React from 'react'
import fire from '../firebase/fire'
import { useEffect, useState } from 'react' 
import  auth  from '../firebase/fire'
import { getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile, 
    sendEmailVerification } from "firebase/auth";
import { useNavigate, useLocation } from 'react-router-dom';
import Nav from '../components/Nav';
import olday from '../../public/oldday.svg'
import gameday from '../../public/gameday.svg'
import test from '../../public/test.svg'
import { ArrowLeftIcon } from '@heroicons/react/solid';
import logout from '../utils/logout';


export default function Register() {
    const navigate = useNavigate()
    const location = useLocation();
    let check = false;

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setLoading(false)
            console.log(user)
            console.log(auth)
            setUser(user)
            console.log(user?.uid)
        })
    },[])

    const [email, setEmail] = useState('');
    const [create, setCreate] = useState(false)
    const [exist, setExist] = useState(false)
    const [user, setUser] = useState({})
    const [ready, setReady] = useState(false)
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')

    async function newUser(){
        try {
            await createUserWithEmailAndPassword(auth, email, password).catch((err) =>
              console.log(err)
            );
            await sendEmailVerification(auth.currentUser).catch((err) =>
              console.log(err)
            );
            await updateProfile(auth.currentUser, { displayName: name }).catch(
              (err) => console.log(err)
            );
          } catch (err) {
            console.log(err);
          }
          console.log(auth.currentUser)
    }

    useEffect(() => {
        if (user && (exist || create)){
            setLoading(true)
            console.log(user)
                setTimeout(() => {
                    navigate('/options', 
                {
                    state:{
                        profile: user?.displayName
                    }
                  })
                }, 2000)
        }
    }, [exist, user, create])

    function login(){
        console.log('in login')
        signInWithEmailAndPassword(auth, email, password)
        .then(({user}) => {
            // Signed in 
            console.log(user)
            setUser(user)
            // ...
        })
        .catch((error) => {
            console.log(error)
        });
        setEmail('');
        setPassword('');
        setReady(true)
    }

    function back () {
        setExist(false);
        setCreate(false)
    }

    useEffect(() => {
        const listener = event => {
          if (event.code === "Enter" || event.code === "NumpadEnter") {
            event.preventDefault();
            if(create){
                newUser();
            }
            if(exist){
                login()
            }
          }
        };
        document.addEventListener("keydown", listener);
        return () => {
          document.removeEventListener("keydown", listener);
        };
      }, );

  return ( 
    <div className='h-screen bg-gradient-to-b w-full from-black via-slate-800 to-indigo-900'>
        {!loading && <div className='bg-transparent h-[50px] w-full relative'>
            <div className='w-[95%]' >
                <div className='flex items-center w-full justify-between'>
                    <div className='flex ml-6 space-x-1 items-center'>
                        <img className='ml-4 invert contain w-20 h-20' src="https://day-ztracker.vercel.app/assets/icons8-flat-60.png" alt="" />
                        <h1 className='text-white py-6 px-4 m-4  font-extrabold tracking-wide
                        text-[48px]'>
                            dayZtrivia
                        </h1>
                    </div>
                    <button onClick={() => setExist(true)} className='font-bold text-center break-words z-50
                        hover:scale-[103%] cursor-pointer bg-purple-400 transiton-all duration-300
                        w-[240px] rounded-[31%] text-[28px] text-gray-900 border-2 py-6 px-4 border-gray-900 overflow-hidden shadow-cool active:shadow-lg m-4'
                        >
                        Sign In
                    </button>
                </div>
            </div>
        </div>}
        <div className='h-full '>
        {!loading && 
        <div className='h-full w-full  max-w-[1280px] mx-auto'>
             {(!create && !exist) && <div className='h-full text-white flex items-center justify-between'>
           <div className='w-[48%] flex flex-col'>
                    <h2 className='text-center break-words z-50 flex items-center justify-center
                                 cursor-default bg-yellow-300 border-[7px]
                                 rounded-[9%] uppercase font-extrabold
                                 text-[44px] text-gray-900 p-12 border-gray-900 overflow-hidden m-4 mb-2 py-8 px-6'>Show off your knowledge</h2>
                    <h1 className='font-bold text-center break-words z-50
                                -translate-x-[15%] cursor-default bg-orange-400 transiton-all duration-300
                                 rounded-[4%] text-[24px] text-gray-900 border-2 p-12 border-gray-900 overflow-hidden shadow-cool active:shadow-sm m-4 py-8 px-6'><span className='font-extrabold'>Start competing 
                    </span> with the <span className='font-extrabold'>award winning </span> 
                    trivia platform <span className='font-extrabold'>dayZtrivia</span></h1>
                    <button onClick={() => setCreate(true)} className='font-bold text-center break-words z-50
                                hover:scale-[103%] cursor-pointer bg-purple-400 transiton-all duration-300
                                 w-5/6 mx-auto rounded-[11%] text-[28px] text-gray-900 border-2 p-12 border-gray-900 overflow-hidden shadow-cool active:shadow-lg m-4 py-8 px-6'
                                 >
                                    Create An Account
                    </button>

                </div>
                <figure className='w-[48%] flex items-center justify-center'>
                    <img className='w-full backdrop-opacity-0' src={olday} alt="" />
                </figure>
            </div>}

        {(create || exist) && 
             <div className='relative flex flex-col items-center justify-center bg-gray-100 shadow-cool border-2 border-gray-900 rounded-[12%] h-[70%] translate-y-[20%]'>
                    <form action="" className='flex flex-col items-center justify-center'>
                        {!exist && <div className='w-[80%] overflow-hidden text-center tracking-wider bg-transparent text-white brightness-0 font-extrabold text-[58px] border-4 border-gray-900 shadow-cool mb-8 p-4 '>
                            <input onChange={(e) => setName(e.target.value)} className='text-white outline-none brightness-200 focus:outline-[0%] placeholder:text-white placeholder:opacity-[15%]  bg-transparent' type="text" placeholder='Create a username' />
                        </div>}
                        <div className='w-[80%] text-center overflow-hidden tracking-wider bg-transparent text-white brightness-0 font-extrabold text-[58px] border-4 border-gray-900 shadow-cool mb-8 p-4 '>
                            <input onChange={(e) => setEmail(e.target.value)} className='text-white focus:outline-none placeholder:text-white placeholder:opacity-[15%]  bg-transparent' type="email" placeholder='Email' />
                        </div>
                        <div className='w-[80%] text-center overflow-hidden tracking-wider bg-transparent text-white brightness-0 font-extrabold text-[58px] border-4 border-gray-900 shadow-cool mb-8 p-4 '>
                            <input onChange={(e) => setPassword(e.target.value)} className='text-white focus:outline-none bg-transparent placeholder:text-white placeholder:opacity-[15%] ' type="password" placeholder='Password'/>
                        </div>
                    </form>
                        <button onClick={back} className='hover:scale-[105%] active:scale-100 
                        transition-all duration-300 cursor-pointer absolute top-12 left-12 w-16 h-16 text-center text-black 9-8'><ArrowLeftIcon/></button>
                    <div className='flex items-center w-full justify-center'>
                        {user?.email?.length > 0 && 
                        <button className='font-bold text-center break-words z-50
                        hover:scale-[103%] cursor-pointer bg-purple-400 transiton-all duration-300
                        w-[40%] rounded-[11%] text-[28px] text-gray-900 border-2 py-6 px-4 border-gray-900 overflow-hidden shadow-cool active:shadow-lg m-4' onClick={logout}>
                            Create Account
                        </button>}
                    </div>
                 </div>
        } 
        {/* {(!create && !exist) &&
        <div className='flex flex-col items-center justify-center h-4/5'>
            <button onClick={() => setExist(true)} className='w-1/4 border-2 p-4 rounded-lg border-white m-2 text-white  bg-transparent'>
                Existing User?
            </button>
            <button onClick={() => setCreate(true)} className='w-1/4 border-2 p-4 rounded-lg border-white m-2 text-white  bg-transparent'>
                Create An Account
            </button>

        </div>} */}

        </div>}
        {loading && 
        <div className='h-full w-full relative flex items-center justify-center'>
        <div className='relative  h-44 w-44 animate-spin  rounded-full bg-gradient-to-r from-pink-600 via-indigo-600 to bg-green-600'>
            <div className='absolute top-[50%] left-[50%] rounded-full -translate-x-1/2 -translate-y-1/2 transform w-40 h-40 bg-slate-900'>
            </div>
        </div>
        </div>
        }
        </div>
    </div>
  )
}
