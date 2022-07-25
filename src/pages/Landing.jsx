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

    const navigate = useNavigate();
    const location = useLocation();
    const query = location.state.query;
    const title = location.state.title
    console.log(query)
 
    async function getQuestions() {
        const { data } = await axios.get(`https://opentdb.com/api.php?amount=10${query}`)
        console.log(data.results)
        setResults(data.results[x]);
    }

    useEffect(() => {
        setEntireList(entireList + (results.question))
        setEveryChoice((everyChoice + (pick + ', ')))
        setEveryCorrect((everyCorrect + (correct + ', ')))
    }, [results])

    async function getQuotes() {
        const { data } = await axios.get('https://api.adviceslip.com/advice')
        console.log(data.slip.advice)
        setQuotes(data.slip.advice)
    }
 
    useEffect(() => {
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
 
    useEffect(()=>{
        console.log(cards)
    }, [cards])

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
        console.log(y)
        if(pick === correct){
            setChoice(true)
            setModal(true)
            setPoints(points + 1000)
            setScore(score + 1)
        }
        else if(y>=1){
            setWrongChoice(true)
            setWrongModal(true)
            if(points <= 500){
                setPoints(0)
            }
            else{
                setPoints(points-250);
            }
        }
    },[y])
 
  return (
    <div className='h-screen bg-idk4 bg-cover bg-center '>
        <div className='backdrop-blur-2xl backdrop-brightness-95 backdrop-opacity-70 h-full'>
        {(!modal && !wrongModal) && <div className='text-white  text-[48px] font-bold tracking-wide text-center  p-4'>{title} | {x+1} of 10 | Points: {points}</div>}
        <button onClick={()=> navigate('/genres')} className='fixed cursor-pointer hover:scale-105 active:scale-90 hover:bg-purple-400  top-6 right-6 w-12 h-12 text-white
        transition-all duration-300'><XIcon/></button>
        
       

        {modal && <div className='h-screen bg-idk  bg-cover bg-center flex justify-center items-center
        text-white flex-col '>
            <div className='h-full backdrop-blur-xl w-full flex flex-col items-center justify-center'>
                 {choice && 
                 <div className='text-[64px] font-bold tracking-wider'>Correct Answer</div>}
                 {x===9 &&
                <button className='mt-8
                px-12 py-6  rounded-lg hover:scale-105 active:scale-95
                transition-all duration-300 hover:bg-blue-500 font-bold text-[28px] bg-purple-400' onClick={toggleModal}>Check Results</button>}
                {x < 9 &&
                <button className='mt-8
                px-12 py-6  rounded-lg hover:scale-105 active:scale-95
                transition-all duration-300 hover:bg-blue-500 font-bold text-[28px] bg-cyan-800' onClick={toggleModal}>Next Question</button>}
            </div>
            </div>}

        {wrongModal && <div className='h-screen bg-idk bg-cover bg-center flex justify-center items-center
        text-white flex-col '>
            <div className='h-full backdrop-blur-lg w-full flex flex-col items-center justify-center'>
                 {wrongChoice && 
                 <div className='text-[64px] font-bold tracking-wider'>Incorrect Answer</div>}
                 <div className='text-white'>The correct answer was: {correct}</div>
                 <div className='text-white'>You chose: {pick}</div>
                 {x===9 &&
                <button className='mt-8
                px-12 py-6  rounded-lg hover:scale-105 active:scale-95
                transition-all duration-300 hover:bg-blue-500 font-bold text-[28px] bg-purple-400' onClick={toggleWrongModal}>Check Results</button>}
                {x < 9 &&
                <button className='mt-8
                px-12 py-6  rounded-lg hover:scale-105 active:scale-95
                transition-all duration-300 hover:bg-blue-500 font-bold text-[28px] bg-purple-400' onClick={toggleWrongModal}>Next Question</button>}
                <div className='text-center absolute bottom-8 tracking-wide text-[32px]'>"{quotes}"</div>
            </div>
            </div>}
        {(!modal && !wrongModal) && <div className='text-white font-bold flex items-center justify-center flex-col'>
            <div className="backdrop-blur-sm m-20 py-8 px-6 max-w-1200 border-l-2 border-r-2 text-[36px] rounded-lg">
                {results.question?.replaceAll(';','').replaceAll('&','').replaceAll('#','').replaceAll('quot','"').replaceAll('039',"'")}
            </div>
            <div className='flex'>
                <div className="flex p-4 flex-wrap justify-center">
                    { cards?.map((option)=> (
                        <div className='w-[700px] max-w-full active:animate-ping-once relative m-4 flex flex-col  justify-center items-center'>
                            <div className=' 
                             relative w-full flex items-center break-all  bg-gradient-to-b from-orange-300 via-pink-600 to bg-blue-600 flex-wrap hover:bg-gradient-to-b active:scale-95 hover:scale-105 transition-all duration-300 bg-center rounded-[20%] leading-none'>
                                <input type="button" className='text-[42px] text-white transition-all duration-300 flex-1 cursor-pointer brightness-105 w-full p-20 m-2' value={option} onClick={picked} placeholder={option?.replaceAll(';','').replaceAll('&','').replaceAll('#','').replaceAll('quot','"').replaceAll('039',"'")}/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>}
        </div>
    </div>
  )
}
