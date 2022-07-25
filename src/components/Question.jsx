import { CheckIcon, XIcon } from '@heroicons/react/solid'
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
                    <div className='relative p-4 m-2 border-2 flex max-w-[1000px] mx-auto'>
                        <div className='pr-4 pl-2 font-bold flex items-center text-[24px] rounded-[23%] bg-center bg-cover'>
                            <div className='opacity-50'>
                                {e[0]}
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <div className='z-50'>
                                {e[1].question.replaceAll(';','').replaceAll('&','').replaceAll('#','').replaceAll('quot','"').replaceAll('039',"'")}?
                            </div>
                            <div>
                                Your Answer: {e[1].choice.replaceAll(';','').replaceAll('&','').replaceAll('#','').replaceAll('quot','"').replaceAll('039',"'")}
                            </div>
                            <div>
                                Correct Answer: {e[1].answer.replaceAll(';','').replaceAll('&','').replaceAll('#','').replaceAll('quot','"').replaceAll('039',"'")}
                            </div>
                        </div>
                        {(e[1].choice === e[1].answer) 
                        ?  
                        <div className='absolute top-[50%] 
                        -translate-y-1/2 right-2 text-green-500 w-16 h-16'><CheckIcon /></div> 
                        : 
                        <div className='absolute top-[50%] 
                        -translate-y-1/2 right-2 text-red-500 w-16 h-16'><XIcon /></div>}
                    </div>
                ))
            }
        </div>
    </div>
  )
}
