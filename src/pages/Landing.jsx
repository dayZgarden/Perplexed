import axios from 'axios'
import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { XIcon } from '@heroicons/react/solid'
 
export default function Landing() {
 
    const [results, setResults] = useState([])
    const [correct, setCorrect] = useState('')
    const [incorrect, setIncorrect] = useState([])
    const [choice, setChoice] = useState(false)
    const [wrongChoice, setWrongChoice] = useState(false);
    const [modal, setModal] = useState(false)
    const [wrongModal, setWrongModal] = useState(false)
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
    const [q, setQ] = useState('')

    const navigate = useNavigate();
    const location = useLocation();
    const query = location.state.query;
    const title = location.state.title
 
    async function getQuestions() {
        const { data } = await axios.get(`https://opentdb.com/api.php?amount=10${q}`)
        setResults(data.results[x]);
    }

    useEffect(() => {
        setEntireList(entireList + (results.question))
        setEveryChoice((everyChoice + (pick + ', ')))
        setEveryCorrect((everyCorrect + (correct + ', ')))
    }, [results])

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    },[])

    async function getQuotes() {
        const { data } = await axios.get('https://api.adviceslip.com/advice')
        setQuotes(data.slip.advice)
    }
 
    useEffect(() => {
        setQ(query.toString().replace('medium', 'easy'))
        getQuestions();
    },[])

 
    useEffect(() => {
        getQuestions();
        getQuotes();
    },[x])
 
    useEffect(() => {
        let arr = [];
        setCorrect(results.correct_answer)
        for(let i = 0; i < results?.incorrect_answers?.length; i++){
            arr[i] = results.incorrect_answers[i];
        }
        setIncorrect(arr)
    }, [results])
 
    useEffect(() => {
        let arr = []
        arr[0] = correct
        for(let i = 1; i < 4; i++){
            arr[i] = incorrect[i-1];
        }
        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
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
 
    function toggleWrongModal() {
        setWrongModal(!wrongModal)
        setX(x+1)
    }

    const picked = event => {
        event.preventDefault();
        setY(y+1)
        setPick(event.target.value)
    }

    useEffect(() => {
        if(pick === correct){
            setChoice(true)
            setModal(true)
            setPoints(points + 1000)
            setScore(score + 1)
        }
        else if(y>=1){
            setWrongChoice(true)
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
    <div className='h-[103vh] bg-idk2 bg-cover bg-center scrollbar-hide'>
        {exit &&
        <div className='relative z-50 h-screen scrollbar-locked flex items-center justify-center flex-col bg-gradient-to-r w-full from-black via-slate-900 to-black text-white'>
            <h1 className='absolute top-5 text-[24px] animate-pulse left-[50%] -translate-x-[50%]'>{title} | Difficulty: Easy</h1>
            <h1 className='font-bold cursor-default p-6 text-[72px] text-center border-4 rounded-[3%] border-blue-400 flex bg-gray-900 text-white max-w-[1000px] mx-auto' >Are you sure you want to exit now?</h1>
            <div className='flex w-1/2 justify-evenly translate-y-[10%]'>
                <button onClick={() => setExit(!exit)} className='hover:bg-white hover:text-gray-900 font-extrabold text-[42px] hover:scale-105 active:scale-100 
                transition-all duration-300 uppercase tracking-wider relative p-10 m-16 mr-8 border-2 rounded-[13%] shadow-cool border-blue-400 flex bg-gray-900 text-white max-w-[850px] mx-auto'>Resume Game</button>
                <button onClick={() => navigate('/options')} className='hover:bg-white hover:text-gray-900 font-extrabold text-[42px] hover:scale-105 active:scale-100 
                transition-all duration-300 uppercase tracking-wider relative p-10 m-16 border-2 rounded-[13%] shadow-cool border-blue-400 flex bg-gray-900 text-white max-w-[850px] mx-auto'>Exit Game</button>
            </div>
        </div>}

        {!loading && <div className='scrollbar-hide backdrop-blur-xl backdrop-brightness-95 backdrop-opacity-70 h-full'>
        {!modal && <div className='break-all z-50 
                                cursor-default bg-orange-400 transiton-all duration-300
                                 rounded-[1%] flex-1 text-[42px] font-bold text-gray-900 border-2 flex items-center justify-center
                                  border-gray-900 overflow-hidden 
                                shadow-cool active:shadow-sm max-w-[1000px] mx-auto h-[100px] text-[42px] font-extrabold tracking-wide text-center p-4'>{title} | {x+1} of 10 | Points: {points}</div>}
        {!modal && <button onClick={()=> setExit(!exit)} className='fixed cursor-pointer hover:scale-105 active:scale-90 hover:bg-purple-400  top-6 right-6 w-12 h-12 text-gray-900
        transition-all duration-300 bg-yellow-300 border-gray-900 border-4'><XIcon/></button>}

        {(modal) && <div className='h-[103vh] bg-idk bg-center bg-cover flex justify-center items-center
        text-white flex-col '>
            <div className='h-full backdrop-blur-lg backdrop-opacity-70 w-full flex flex-col items-center justify-center'>
                    {(pick === correct) ? 
                    <div className='text-[48px] tracking-wider'>
                        CORRECT
                    </div>
                    : 
                    <div className='text-center'>
                        <div className='text-[64px] font-bold tracking-wider'>Incorrect Answer</div>
                        <div className='text-[36px] text-white'>The correct answer was: {correct}</div>
                        <div className='text-[36px] text-white'>You chose: {pick}</div>
                    </div>
                    }
                 {x < 9 &&
                    <div className='mt-8
                     p-[2px] rounded-[20%] hover:scale-105 active:scale-95
                    transition-all duration-500 bg-gradient-to-b from-slate-800 via-gray-900 to-blackish shadow-cool active:shadow-md'> 
                        <button className='rounded-[21%] px-16 py-10 hover:bg-gray-300 hover:text-gray-900 font-bold text-[30px] bg-gray-700 tracking-wider font-extrabold' onClick={toggleModal}>Next Question</button>
                    </div>}
                {x === 9 &&
                <button className='mt-8
                px-12 py-6  rounded-lg hover:scale-105 active:scale-95
                transition-all duration-300 hover:bg-blue-500 font-bold text-[28px] bg-red-600' onClick={toggleModal}>Check Results</button>}
                <div className='text-center absolute bottom-16 tracking-wide text-[36px]'>"{quotes}"</div>
            </div>
            </div>}
        {!modal && <div className='text-white font-bold flex items-center justify-center flex-col'>
            <div className="'text-center break-all z-50 flex items-center justify-center
                                hover:scale-[102%] cursor-default bg-yellow-300 transiton-all duration-300
                                 rounded-[1%] flex-1 text-[42px] font-bold text-gray-900 border-2 p-12 border-gray-900 overflow-hidden shadow-cool active:shadow-sm m-10 mb-6 py-8 px-6 max-w-1200 text-[32px]">
                {results.question?.replaceAll(';','').replaceAll('&','').replaceAll('#','').replaceAll('quot','"').replaceAll('039',"'")}
            </div>
            <div className='flex'>
                <div className="flex p-4 flex-wrap justify-center">
                    { cards?.map((option)=> (
                        <div className='w-1/3 max-w-[700px] active:animate-ping-once relative m-4 flex flex-col  justify-center items-center'>
                            <div className='
                             relative w-full flex items-center flex-wrap active:scale-95 hover:scale-105 transition-all duration-300 rounded-[20%] leading-none'>
                                <input type="button" className='break-words z-50 odd:bg-purple-300 cursor-pointer 
                                hover:scale-[103%] m-2 hover:bg-orange-400 active:scale-100  transiton-all duration-300
                                 rounded-[11%] flex-1 text-[42px] font-bold w-1/2 text-gray-900 border-2 p-12 border-gray-900 overflow-hidden shadow-cool active:shadow-sm' 
                                 value={option} onClick={picked} placeholder={option?.replaceAll(';','').replaceAll('&','').replaceAll('#','').replaceAll('quot','"').replaceAll('039',"'")}/>
                            </div>
                        </div>
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
