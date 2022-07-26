import React from 'react'
import fire from '../firebase/fire'
import { useEffect, useState } from 'react'
import { getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile, 
    sendEmailVerification } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import olday from '../../public/oldday.svg'
import gameday from '../../public/gameday.svg'
import test from '../../public/test.svg'


export default function Register() {
    const navigate = useNavigate()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setLoading(false)
            console.log(user)
            setUser(user)
            console.log(exist)
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
    const [profile, setProfile] = useState()



    const auth = getAuth();

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

    function logout(){
        signOut(auth);
        setUser({})
        setReady(false)
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
    <div className='h-screen bg-gradient-to-r w-full from-black via-slate-900 to-black'>
        <Nav />
        <div className='h-full '>
        {!loading && 
        <div className='h-full w-full  max-w-[1200px] mx-auto'>
            <div className='h-full text-white flex items-center'>
                <div className='w-[49%] flex flex-col'>
                    <h2 className='text-center break-words z-50 flex items-center justify-center
                                 cursor-default bg-yellow-300 border-[7px]
                                 rounded-[9%] uppercase font-extrabold
                                 text-[44px] text-gray-900 p-12 border-gray-900 overflow-hidden m-4 mb-2 py-8 px-6'>Show off what you know</h2>
                    <h1 className='font-bold text-center break-words z-50
                                -translate-x-[15%] cursor-default bg-orange-400 transiton-all duration-300
                                 rounded-[4%] font-bold
                                 text-[24px] text-gray-900 border-2 p-12 border-gray-900 overflow-hidden shadow-cool active:shadow-sm m-4 py-8 px-6'><span className='font-extrabold'>Start competing 
                    </span> with the <span className='font-extrabold'>award winning </span> 
                    trivia platform <span className='font-extrabold'>dayZtrivia</span></h1>
                    <button onClick={() => setCreate(true)} className='font-bold text-center break-words z-50
                                hover:scale-[103%] cursor-pointer bg-purple-400 transiton-all duration-300
                                 w-5/6 mx-auto rounded-[11%] text-[28px] text-gray-900 border-2 p-12 border-gray-900 overflow-hidden shadow-cool active:shadow-lg m-4 py-8 px-6'
                                 >
                                    Create An Account
                    </button>

                </div>
                <figure className='w-[49%] flex items-center justify-center ml-4'>
                    <img className='w-full backdrop-opacity-0' src={olday} alt="" />
                </figure>
            </div>

        {(create || exist) && 
             <div className='flex flex-col items-center justify-center  h-4/5'>
                    <form action="" className='flex flex-col items-center justify-center'>
                        <div className='border-2 p-4 rounded-lg border-white m-2'>
                            <input onChange={(e) => setName(e.target.value)} className='text-white focus:outline-none placeholder:text-white bg-transparent' type="text" placeholder='Jane' />
                        </div>
                        <div className='border-2 p-4 rounded-lg border-white m-2'>
                            <input onChange={(e) => setEmail(e.target.value)} className='text-white focus:outline-none placeholder:text-white bg-transparent' type="email" placeholder='janedoe@email.com' />
                        </div>
                        <div className='border-2 p-4 rounded-lg border-white m-2'>
                            <input onChange={(e) => setPassword(e.target.value)} className='text-white focus:outline-none bg-transparent placeholder:text-white ' type="password" placeholder='password'/>
                        </div>
                    </form>
                    <button onClick={back} className='cursor-pointer w-[200px] text-center text-white 9-8'>Back</button>
                    {user?.email?.length > 0 && 
                    <button className='text-white p-4 bg-blue-500' onClick={logout}>
                    Logout
                    </button>}
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
        {loading && <div className='relative h-44 w-44 animate-spin  rounded-full bg-gradient-to-r from-pink-600 via-indigo-600 to bg-green-600'>
            <div className='absolute top-1/2 left-1/2 rounded-full -translate-x-1/2 -translate-y-1/2 transform w-40 h-40 bg-blackish'>
            </div>
        </div>}
        </div>
    </div>
  )
}
