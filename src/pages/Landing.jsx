import axios from 'axios'
import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
 
export default function Landing() {
 
    const [results, setResults] = useState([])
    const [track, setTrack] = useState([])
    const [correct, setCorrect] = useState('')
    const [incorrect, setIncorrect] = useState([])
    const [choice, setChoice] = useState(false)
    const [wrongChoice, setWrongChoice] = useState(false);
    const [modal, setModal] = useState(false)
    const [wrongModal, setWrongModal] = useState(false)
    const [x, setX] = useState(0)
    const [pick, setPick] = useState()
    const [cards, setCards] = useState([])
    const [points, setPoints] = useState(0);
    const[score, setScore] = useState(0);

    const navigate = useNavigate();
 
    async function getQuestions() {
        const { data } = await axios.get('https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple')
        console.log(data.results)
        setResults(data.results[x]);
    }
 
    useEffect(() => {
        getQuestions();
    },[])
 
    useEffect(() => {
        getQuestions();
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
 
    // function handleCorrect() {
    //     setChoice(true)
    //     setModal(true)
    //     setPoints(points + 1000)
    // }

    if(x===10){
        navigate('/results', 
        {
            state:{
              uPoints: points,
              uScore: score
            }
          })
    }


    useEffect(() => {
        if(pick === correct){
            setChoice(true)
            setModal(true)
            setPoints(points + 1000)
            setScore(score + 1)
        }
        else if(pick !== correct && x>=1){
            setWrongChoice(true)
            setWrongModal(true)
            setPoints(points - 500);
        }
    }, [pick])

    // useEffect(() => {
    //     setWrongChoice(true)
    //     setWrongModal(true)
    //     setPoints(points - 500)
    // }, [pick])

    useEffect(()=> {
        console.log(pick)
    },[pick])
 
    // function handleIncorrect(){
    //     setWrongChoice(true)
    //     setWrongModal(true)
    //     setPoints(points - 500)
    // }
 
    function toggleModal() {
        setModal(!modal)
        setX(x + 1);
    }
 
    function toggleWrongModal() {
        setWrongModal(!wrongModal)
        setX(x+1)
    }
 
  return (
    <div className='bg-black h-screen'>
        <div className='text-white absolute top-[25px] right-[25px] tracking-widest font-bold border-2 p-4 rounded-lg'>{points} points</div>
        {modal && <div className='bg-green-800 h-screen flex justify-center items-center
         text-white flex-col'>
            {choice && <div className='text-[64px] font-bold tracking-widest'>Correct Answer!</div>}
            <button onClick={toggleModal} className='mt-8
            px-12 py-6  rounded-[9999px] hover:scale-110 active:scale-90
            transition-all duration-300 border-2 font-bold'>Next Question</button>
            </div>}
        {wrongModal && <div className='bg-red-800 h-screen flex justify-center items-center
        text-white flex-col'>
            {wrongChoice && <div className='text-[64px] font-bold tracking-widest'>Incorrect Answer!</div>}
            <button className='mt-8
            px-12 py-6  rounded-[9999px] hover:scale-110 active:scale-90
            transition-all duration-300 border-2 font-bold' onClick={toggleWrongModal}>Next Question</button>
            </div>}
        {(!modal || !wrongModal) && <div className='text-white font-bold flex items-center justify-center flex-col'>
            <div className="m-24 py-8 px-6 max-w-1200 border-l-2 border-r-2 text-[36px] rounded-lg">
                {results.question}
            </div>
            <div className='flex'>
                <div className="">
                    {cards?.map((option)=> (
                        <div className='flex justify-center items-center w-[1200px]'>
                            <input type="button" className='cursor-pointer m-4 p-8 border-2 rounded-lg w-1/2' value={option} onClick={()=> setPick(option)} placeholder={option}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>}
    </div>
  )
}
