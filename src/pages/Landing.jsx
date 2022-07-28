import axios from 'axios'
import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { XIcon } from '@heroicons/react/solid'
import getQuestions from '../utils/getQuestions'
import getQuotes from '../utils/getQuotes'
import Card from '../components/Card'
import { randomizeArray } from '../utils/randomizeArray'
 
export default function Landing() {
 
    const [results, setResults] = useState([])
    const [correct, setCorrect] = useState('')
    const [incorrect, setIncorrect] = useState([])
    const [modal, setModal] = useState(false)
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const [pick, setPick] = useState()
    const [cards, setCards] = useState([])
    const [points, setPoints] = useState(0);
    const[score, setScore] = useState(0);
    const[quotes, setQuotes] = useState([])
    const[entireList, setEntireList] = useState('')
    const[everyChoice, setEveryChoice] = useState('')
    const[everyCorrect, setEveryCorrect] = useState('');
    const[loading, setLoading] = useState(true);
    const[exit, setExit] = useState(false)
    const [temp, setTemp] = useState([])
    const [seconds, setSeconds] = useState(0);

    var timer;

    useEffect(() => {
        timer = setInterval(() => {
            setSeconds(seconds + 1)
        },1000)

    return () => clearInterval(timer);
    })


    const navigate = useNavigate();
    const location = useLocation();
    const query = location.state.query;
    const title = location.state.title
    console.log(query)

    useEffect(() => {
        setEntireList(entireList + (results?.question))
        setEveryChoice((everyChoice + (pick + ', ')))
        setEveryCorrect((everyCorrect + (correct + ', ')))
    }, [results])

    useEffect(() => {
        getQuestions(query).then(res => {
            console.log(res)
            setTemp(res)
            setResults(res[0])
        })
        setTimeout(() =>{
            setLoading(false)
        }, 2250)
    },[query])
 
    useEffect(() => {
        setResults(temp[x])
        getQuotes().then(res => {
            setQuotes(res)
        })
    },[x])
 
    useEffect(() => {
        let arr = [];
        setCorrect(results?.correct_answer)
        for(let i = 0; i < results?.incorrect_answers?.length; i++){
            arr[i] = results.incorrect_answers[i];
        }
        setIncorrect(arr)
    }, [results])
 
    useEffect(() => {
        let arr = []
        arr[0] = correct
        arr = randomizeArray(arr, incorrect)
        setCards(arr)
    }, [correct, incorrect])

    if(x===10){
        setEntireList(entireList)
        setEveryChoice(everyChoice)
        navigate('/results', 
        {
            state:{
              uPoints: points,
              uScore: score,
              all: entireList,
              choices: everyChoice,
              rights: everyCorrect
            }
          })
    }

    function toggleModal() {
        setModal(!modal)
        setX(x + 1);
    }

    const picked = event => {
        event.preventDefault();
        setY(y+1)
        setPick(event.target.value)
    }

    useEffect(() => {
        if(pick === correct){
            setModal(true)
            setPoints(points + 1000)
            setScore(score + 1)
        }
        else if(y>=1){
            setModal(true)
            if(points <= 500){
                setPoints(0)
            }
            else{
                setPoints(points-250);
            }
        }
    },[y])

 
  return (
    <div className='xl:h-[103vh] lg:h-[200vh] bg-idk2 bg-cover bg-center scrollbar-hide'>
        {exit &&
        <div className='relative z-50 h-full scrollbar-locked flex items-center justify-center flex-col bg-gradient-to-r w-full from-black via-slate-900 to-black text-white'>
            <h1 className='absolute top-5 text-[24px] animate-pulse left-[50%] -translate-x-[50%]'>{title} | Difficulty: Easy</h1>
            <h1 className='font-bold cursor-default p-6 text-[72px] text-center border-4 rounded-[3%] border-blue-400 flex bg-gray-900 text-white max-w-[1000px] mx-auto' >Are you sure you want to exit now?</h1>
            <div className='flex w-1/2 justify-evenly translate-y-[10%]'>
                <button onClick={() => setExit(!exit)} className='hover:bg-white hover:text-gray-900 font-extrabold text-[42px] hover:scale-105 active:scale-100 
                transition-all duration-300 uppercase tracking-wider relative p-10 m-16 mr-8 border-2 rounded-[13%] shadow-cool border-blue-400 flex bg-gray-900 text-white max-w-[850px] mx-auto'>Resume Game</button>
                <button onClick={() => navigate('/options')} className='hover:bg-white hover:text-gray-900 font-extrabold text-[42px] hover:scale-105 active:scale-100 
                transition-all duration-300 uppercase tracking-wider relative p-10 m-16 border-2 rounded-[13%] shadow-cool border-blue-400 flex bg-gray-900 text-white max-w-[850px] mx-auto'>Exit Game</button>
            </div>
        </div>}

        {!exit && !loading && <div className='scrollbar-hide backdrop-blur-xl backdrop-brightness-95 backdrop-opacity-70 h-full'>
        <div id='timer' className='fixed top-3 left-3 text-white text-[64px] font-extrabold
        px-4 py-2 rounded-full'>{seconds}</div>
        {!modal && <div className='break-all 
                                cursor-default bg-orange-400 transiton-all duration-300
                                 rounded-[1%] flex-1 text-[42px] font-bold text-gray-900 border-2 flex items-center justify-center
                                  border-gray-900 overflow-hidden 
                                shadow-cool active:shadow-sm max-w-[1000px] mx-auto h-[15%] tracking-wide text-center'>{title} | {x+1} of 10 | Points: {points}</div>}
        {!modal && <button onClick={()=> setExit(!exit)} className='fixed cursor-pointer hover:scale-105 active:scale-90 hover:bg-purple-400  top-6 right-6 w-12 h-12 text-gray-900
        transition-all duration-300 bg-yellow-300 border-gray-900 border-4'><XIcon/></button>}

        {(modal) && <div className='h-[103vh] overflow-hide bg-dark2 bg-center bg-fill flex items-center
        text-white flex-col '>
            <div className='h-full p-8 backdrop-blur-lg backdrop-opacity-90 w-full justify-center flex flex-col items-center'>
                    {(pick === correct) && 
                    <div className='w-[60%] text-center tracking-wider bg-transparent text-white brightness-0 font-extrabold text-[48px] border-4 border-gray-900 shadow-cool mb-8 p-4 '>
                        Correct Answer
                    </div>}
                    
                    <div className=' w-full  flex flex-col items-center'>
                        {!(pick===correct) && <div className='text-center tracking-wider bg-transparent text-white brightness-0 font-extrabold text-[58px] border-4 border-gray-900 shadow-cool mb-8 p-4 w-[60%]'>Incorrect Answer</div>}
                        <div className='flex mt-10 space-x-4 2xl:m-0 justify-center items-center 2xl:flex-col'>

                        {!(pick===correct) && 
                        <div className=' p-6  border-2 border-gray-900  shadow-cool rounded-[7%] flex bg-gray-50 brightness-90 text-gray-900 max-w-[850px] mx-auto'>
                                 <div className=' h-full tracking-wider font-extrabold w-full bg-transparent rounded-[10%] p-4 flex-col'>
                                        <div className='text-[28px] 2xl:text-[36px]  p-2'>Your answer: {pick}</div>
                                        <div className='text-[28px] 2xl:text-[36px] p-2'>Correct answer: {correct}</div>
                                </div>
                        </div>}
                        {x < 9 &&
                           <div className='2xl:mt-8 w-[45%] 2xl:w-[80%]
                            p-[2px] rounded-[21%] hover:scale-105 active:scale-95
                           transition-all duration-500 bg-gradient-to-b from-slate-800 via-gray-900 to-blackish shadow-cool active:shadow-md'> 
                               <button className='invert w-full rounded-[21%] px-16 py-10 text-[42px] bg-gradient-to-t from-blue-800  to-rose-800 tracking-wider font-extrabold' onClick={toggleModal}>Next Question</button>
                           </div>}
                       {x === 9 &&
                           <div className='2xl:mt-8 w-[45%] 2xl:w-[80%]
                               p-[2px] rounded-[20%] hover:scale-105 active:scale-95
                               transition-all duration-500 bg-gradient-to-b from-slate-800 via-gray-900 to-blackish shadow-cool active:shadow-md'> 
                               <button className='invert rounded-[21%] px-16 py-10 text-[42px] bg-gradient-to-t from-blue-800  to-rose-800 tracking-wider font-extrabold' onClick={toggleModal}>Check Results</button>
                           </div>}
                        </div>
                    </div>
                    
                <div className='text-center p-2 mt-8 tracking-wide text-[28px] xl:text-[36px]'>"{quotes}"</div>
            </div>
            </div>}
        {!modal && <div className='text-white font-bold flex items-center justify-center flex-col translate-y-[15%]'>
            <div className="'text-center break-words z-50 flex items-center justify-center
                                hover:scale-[102%] cursor-default bg-yellow-300 transiton-all duration-300
                                 rounded-[1%] flex-1 text-[32px] font-bold text-gray-900 border-2 border-gray-900 overflow-hidden shadow-cool active:shadow-sm m-2 p-5 max-w-1200 ">
                {results?.question?.replaceAll(';','').replaceAll('&','').replaceAll('#','').replaceAll('quot','"').replaceAll('039',"'")}
            </div>
            <div className='flex'>
                <div className="flex p-4 flex-wrap justify-center">
                    { cards?.map((option)=> (
                        <Card option={option} picked={picked}/>
                    ))}
                </div>
            </div>
        </div>}
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
