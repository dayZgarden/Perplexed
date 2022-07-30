import { CheckIcon, XIcon } from '@heroicons/react/solid'
import React, {useState, useEffect} from 'react'

export default function Question({question, choice, right}) {

    console.log(question)
    console.log(choice)
    console.log(right)
    
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


  return (
    <div className='bg-gradient-to-r w-full from-black via-slate-800 h-full'>

        <div className='backdrop-blur-xl backdrop-opacity-70'>
            {
                arr.map((e) => (
                    <div className='max-w-[90%] mx-auto font-bold lg:odd:-translate-x-[10%] lg:even:translate-x-[10%] relative p-10 m-16 border-2 rounded-[13%] shadow-cool border-blue-400 
                    flex md:flex-row items-center flex-col bg-gray-900 text-white lg:max-w-[850px]'>
                        <div className='pr-2 mr-4 font-bold flex  items-center text-[64px] rounded-[23%] bg-center bg-cover'>
                            <div className='bg-gray-900 text-white rounded-full p-4'>
                                {parseInt(e[0])+1}
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <div className='text-[20px] md:text-[32px] z-50 break-words md:break-normal'>
                                {e[1].question?.replaceAll(';','').replaceAll('&','').replaceAll('#','').replaceAll('quot','"').replaceAll('039',"'")}
                            </div>
                            <div className='my-1 md:text-[24px]'>
                                You Chose: {e[1].choice?.replaceAll(';','').replaceAll('&','').replaceAll('#','').replaceAll('quot','"').replaceAll('039',"'")}
                            </div>
                            <div className='md:text-[24px]'>
                                 Correct Answer: {e[1].answer?.replaceAll(';','').replaceAll('&','').replaceAll('#','').replaceAll('quot','"').replaceAll('039',"'")}
                            </div>
                        </div>
                        {(e[1].choice?.replaceAll(';','').replaceAll('&','').replaceAll('#','').replaceAll('quot','"').replaceAll('039',"'")
                         === e[1].answer?.replaceAll(';','').replaceAll('&','').replaceAll('#','').replaceAll('quot','"').replaceAll('039',"'")) 
                        ?  
                        <div className='absolute md:top-[50%] top-4
                        md:-translate-y-1/2 right-2 text-green-500 w-16 h-16'><CheckIcon /></div> 
                        : 
                        <div className='absolute md:top-[50%] top-4
                        md:-translate-y-1/2 right-2 text-red-500 w-16 h-16'><XIcon /></div>}
                    </div>
                ))
            }
        </div>
        
    </div>
  )
}
