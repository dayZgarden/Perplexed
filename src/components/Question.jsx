import React, {useState, useEffect} from 'react'

export default function Question({question, choice, right}) {
    
    const obj = {}
    for(let i = 0; i < 10; i++){
        obj[i] = {
            question: question[i],
            choice: choice[i],
            answer: right[i]
        }
    }


    const arr = Object.entries(obj)
    console.log(arr)

    console.log(question)
  return (
    <div className='text-white'>
        <div>
            {
                arr.map((e) => (
                    <div className='p-4'>
                        {e[0]}. {e[1].question}?
                        <br />
                        Your Answer: {e[1].choice}
                        <br />
                        Correct Answer: {e[1].answer}
                    </div>
                ))
            }
        </div>
    </div>
  )
}
