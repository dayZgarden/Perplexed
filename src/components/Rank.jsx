import React, {useState, useEffect} from 'react'

export default function Rank( {user}) {
    
    useEffect(() => {
        console.log(user)
    },[user])


  return (
    <div className='border-4 p-2 rounded-[6%] break-words sm:w-[48%] m-1  border-black'>
        <div className='flex items-center space-x-2'>
            <img className='w-6 h-6' src="https://uxwing.com/wp-content/themes/uxwing/download/sport-and-awards/trophy-icon.png" alt="" />
            <h1>{user?.name} | {user?.points} points</h1>
        </div>
    </div>
  )
}
