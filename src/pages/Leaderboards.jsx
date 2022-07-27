import React from 'react'

export default function Leaderboards() {
  return (
    <div className='h-screen'>
      <div className='h-full w-full flex  items-center justify-center'>
        <div className='bg-transparent w-[70%] h-[80%] rounded-lg group'>
          <div className='cursor-pointer bg-white brightness-150 h-full w-full duration-1000 relative 
          preserve-3d group-hover:my-rotate-y-180'>
            <div className='absolute border-black border-2 w-full h-full'>
              profile | 1500 points
            </div>
            <ul className='absolute w-full h-full bg-gray-100'>
              {/* <li>1. DoggyDude42</li>
              <li>2. CatBro55</li>
              <li>3. Ninja</li>
              <li>4. NickAtNyte</li>
              <li>5. XxProZxXz</li>
              <li>6. ULTRAxF1RE</li>
              <li>7. MOLT</li>
              <li>8. KevinDurantOW</li>
              <li>9. Pink</li>
              <li>10. Woofwoof1</li>
              <li className='opacity-60'>See more...</li> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
