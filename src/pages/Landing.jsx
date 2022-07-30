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
    const [randomQuery, setRandomQuery] = useState('')
    const [a, setA] = useState(0)

    var timer;

    useEffect(() => {
        timer = setInterval(() => {
            setSeconds(seconds + 1)
        },1000)

    return () => clearInterval(timer);
    })

    useEffect(() => {
        if(seconds === 100000000000000){
            setPick('Out of Time')
            setY(y+1)
        }
    }, [seconds])


    const navigate = useNavigate();
    const location = useLocation();
    const query = location.state.query;
    const title = location.state.title



    useEffect(() => {
    }, [results])

    useEffect(() => {
        console.log(temp)
        let qArr = []
        let cArr = []
        temp.map((elem) => {
            console.log(elem.question)
            qArr += elem.question + 'tempword'
            cArr += elem.correct_answer + 'tempword'
        })
        qArr.length > 0 && setEntireList(qArr)
        cArr.length > 0 && setEveryCorrect(cArr)
        
    }, [temp])
    
    useEffect(() => {
        const rndInt = Math.floor(Math.random() * 3) + 1
        console.log(rndInt)
        if(rndInt === 1){
            setRandomQuery('easy')
        }
        else if(rndInt === 2){
            setRandomQuery('medium')
        }
        else{
            setRandomQuery('hard')
        }
        setA(1)
    }, [query])

    useEffect(() => {
        console.log(randomQuery)
        let q = query.replaceAll('=medium', `=${randomQuery}`)
        console.log(q)
        getQuestions(q).then(res => {
            console.log(res)
            setTemp(res)
            setResults(res[0])
        })
        setTimeout(() =>{
            setLoading(false)
        }, 2250)
    },[a])
 
    useEffect(() => {
        setResults(temp[x])
        getQuotes().then(res => {
            setQuotes(res)
        })
    },[x])
 
    useEffect(() => {
        let arr = [];
        setCorrect(results?.correct_answer?.replaceAll(';','').replaceAll('amp','&').replaceAll('&','').replaceAll('#','').replaceAll('quot','"').replaceAll('039',"'"))
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
        console.log(everyChoice)
        console.log(everyChoice[10])
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
        setSeconds(0);
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
            setEveryChoice((everyChoice + (pick + 'tempword')))

        }
        else if(y>=1){
            setEveryChoice((everyChoice + (pick + 'tempword')))
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
    <div className='h-screen bg-idk2 bg-center bg-cover scrollbar-hide'>
        {exit &&
        <div className='relative  z-50 h-full scrollbar-locked flex items-center justify-center flex-col bg-gradient-to-r w-full from-black via-slate-900 to-black text-white'>
            <h1 className='absolute  top-5 md:text-[24px] animate-pulse left-[50%] -translate-x-[50%]'>{title} | Difficulty: {randomQuery}</h1>
            <h1 className='font-bold max-w-[80%] mx-auto cursor-default p-6 text-[42px] md:text-[72px] text-center border-4 rounded-[3%] border-blue-400 flex bg-gray-900 text-white md:max-w-[1000px]' >Are you sure you want to exit now?</h1>
            <div className='flex md:flex-row flex-col md:w-1/2 md:justify-evenly translate-y-[10%]'>
                <button onClick={() => setExit(!exit)} className='hover:bg-white hover:text-gray-900 font-extrabold text-[32px] md:text-[42px] hover:scale-105 active:scale-100 
                transition-all duration-300 uppercase tracking-wider relative p-10 m-4 md:m-16 mr-8 border-2 rounded-[13%] shadow-cool border-blue-400 flex bg-gray-900 text-white w-[80%] md:max-w-[850px] mx-auto'>Resume Game</button>
                <button onClick={() => navigate('/options')} className='hover:bg-white hover:text-gray-900 font-extrabold text-[32px] md:text-[42px] hover:scale-105 active:scale-100 
                transition-all duration-300 uppercase  tracking-wider relative p-10 m-4 md:m-16 border-2 rounded-[13%] shadow-cool border-blue-400 flex bg-gray-900 text-white w-[80%] md:max-w-[850px] mx-auto'>Leave Game</button>
            </div>
        </div>}

        {!exit && !loading && <div className='scrollbar-hide backdrop-blur-xl backdrop-brightness-95 backdrop-opacity-70 h-full'>
        {!modal && <div id='timer' className='fixed border-b-4 top-[148px] text-[36px] md:top-3 right-10 p-4 text-white sm:text-[48px] lg:text-[60px] xl:text-[72px] font-extrabold
        px-4 py-2  brightness-150'>{10 - seconds}</div>}
        {!modal && <div className='break-words 
                                cursor-default bg-orange-400 transiton-all duration-300
                                 rounded-[1%] flex-1 text-[36px]  md:text-[42px] font-bold text-gray-900 border-2 flex items-center justify-center
                                  border-gray-900 overflow-hidden 
                                shadow-cool active:shadow-sm  md:max-w-[60%] xl:max-w-[70%] mx-auto h-[15%] tracking-wide text-center'>{title} | {x+1} of 10 | Points: {points} </div>}
        {!modal && <button onClick={()=> setExit(!exit)} className='fixed cursor-pointer hover:scale-105 active:scale-90 hover:bg-purple-400 top-[168px]  md:top-6 left-6 w-12 h-12 text-gray-900
        transition-all duration-300 bg-yellow-300 border-gray-900 border-4'><XIcon/></button>}

        {(modal) && <div className='h-[100vh] scrollbar-hide overflow-hide bg-dark2 bg-center bg-fill flex items-center
        text-white flex-col '>
            <div className='h-full p-8 backdrop-blur-lg backdrop-opacity-90 w-full justify-center flex flex-col items-center'>
                    {(pick === correct) && 
                    <div className='w-[70%] text-center tracking-wider bg-transparent text-white brightness-0 font-extrabold text-[48px] border-4 border-gray-900 shadow-cool mb-8 p-4 '>
                        Correct Answer
                    </div>}
                    
                    <div className=' w-full flex flex-col items-center'>
                        {!(pick===correct) && <div className='text-center tracking-wider md:mt-0 mt-42 bg-transparent text-white brightness-0 font-extrabold text-[36px] md:text-[58px] border-4 border-gray-900 shadow-cool mb-8 p-4 sm:w-[60%]'>Incorrect Answer</div>}
                        <div className='flex mt-10 space-x-4 2xl:m-0 justify-center items-center flex-col'>

                        {!(pick===correct) && 
                        <div className=' p-6 h-[100%]   border-2 border-gray-900  shadow-cool rounded-[7%] flex bg-gray-50 brightness-90 text-gray-900 max-w-[850px] mx-auto'>
                                 <div className=' h-full tracking-wider font-extrabold w-full bg-transparent rounded-[10%] p-4 flex-col'>
                                        <div className='text-[24px] md:text-[32px] 2xl:text-[36px]  p-2'>Your answer: {pick}</div>
                                        <div className='text-[24px] md:text-[32px] 2xl:text-[36px]  p-2'>Correct answer: {correct}</div>
                                </div>
                        </div>}
                        {x < 9 &&
                           <div className='mt-8 w-[90%] h-[90%] 
                            p-[2px] rounded-[21%] hover:scale-105 active:scale-95
                           transition-all duration-500 bg-gradient-to-b from-slate-800 via-gray-900 to-blackish shadow-cool active:shadow-md'> 
                               <button className='invert w-full rounded-[21%] h-full px-16 py-10 text-[24px] sm:text-[42px] bg-gradient-to-t from-blue-800  to-rose-800 tracking-wider font-extrabold' onClick={toggleModal}>Next Question</button>
                           </div>}
                       {x === 9 &&
                           <div className='mt-8 w-[80%]
                               p-[2px] rounded-[20%] hover:scale-105 active:scale-95
                               transition-all duration-500 bg-gradient-to-b from-slate-800 via-gray-900 to-blackish shadow-cool active:shadow-md'> 
                               <button className='invert w-full rounded-[21%] px-16 py-10 text-[42px] bg-gradient-to-t from-blue-800  to-rose-800 tracking-wider font-extrabold' onClick={toggleModal}>Check Results</button>
                           </div>}
                        </div>
                    </div>
                    
                <div className='text-center p-2 mt-8 tracking-wide sm:text-[28px] xl:text-[36px]'>"{quotes}"</div>
            </div>
            </div>}
        {!modal && <div className='text-white font-bold flex items-center justify-center flex-col translate-y-[15%]'>
            <div className="'text-center break-words z-50 flex items-center justify-center
                                 cursor-default bg-yellow-300 transiton-all duration-300
                                 rounded-[1%] flex-1 text-[32px] font-bold text-gray-900 border-2 border-gray-900 overflow-hidden shadow-cool active:shadow-sm m-2 p-5 max-w-1200 ">
                {results?.question?.replaceAll(';','').replaceAll('&','').replaceAll('#','').replaceAll('quot','"').replaceAll('039',"'")}
            </div>
            <div className='flex w-full'>
                <div className="flex flex-col items-center md:flex-row p-4 md:flex-wrap justify-center w-[100%]">
                    { cards?.map((option)=> (
                        <Card option={option.replaceAll(';','').replaceAll('amp','&').replaceAll('&','').replaceAll('#','').replaceAll('quot','"').replaceAll('039',"'")} picked={picked}/>
                    ))}
                </div>
            </div>
        </div>}
        </div>}
        {loading && 
        <div className='h-screen w-full flex items-center justify-center bg-gradient-to-r from-black via-slate-900 to-black'>
          <div className='relative h-44 w-44 animate-spin  rounded-full bg-gradient-to-r from-pink-600 via-indigo-600 to bg-green-600'>
              <div className='absolute top-1/2 left-1/2 rounded-full -translate-x-1/2 -translate-y-1/2 transform w-40 h-40 bg-slate-900'>
              </div>
          </div>
        </div>}
    </div>
  )
}
