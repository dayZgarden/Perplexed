import React from 'react';
import { useState } from 'react';

const Wheel = () => {

  const [selectedSection, setSelectedSection] = useState(null);

  const sections = [
    "Section 1",
    "Section 2",
    "Section 3",
    "Section 4",
    "Section 5",
    "Section 6",
    "Section 7",
    "Section 8",
    "Section 9",
    "Section 10",
    "Section 11",
    "Section 12",
  ];

  const handleSpin = () => {
    // Generate a random number between 0 and 11
    const randomIndex = Math.floor(Math.random() * sections.length);

    // Set the selected section based on the random index
    setSelectedSection(sections[randomIndex]);
  };

//   return (
//     <div>
//       <div>Selected Section: {selectedSection || "None"}</div>
//       <button onClick={handleSpin}>Spin</button>
//       <div>
//         {sections.map((section, index) => (
//           <div key={index}>{section}</div>
//         ))}
//       </div>
//     </div>
//   );

    return (
        <div>
            <button onClick={handleSpin}>Spin</button>
            <div>Selected Section: {selectedSection || "None"}</div>
            <ul className="w-[25em] h-[25em] border-[1px] border-black relative p-0 mx-auto my-[1em] rounded-[50%] overflow-hidden">
                <li className='overflow-hidden absolute top-0 right-0 w-[50%] h-[50%] rotate-[0deg] skew-y-[-60deg] origin-[0%,100%]'>
                    <div spellcheck="false" className='bg-violet-400  absolute left-[-100%] w-[200%] h-[200%] text-center block skew-y-[60deg] rotate-[15deg]' contentEditable="true">1</div>
                </li>
                <li className='overflow-hidden absolute top-0 right-0 w-[50%] rotate-[30deg] skew-y-[-60deg] h-[50%] origin-[0%,100%]'>
                    <div spellcheck="false" className='bg-orange-400  absolute left-[-100%] w-[200%] h-[200%] text-center block skew-y-[60deg] rotate-[15deg]' contentEditable="true">2</div>
                </li>
                <li className='overflow-hidden absolute top-0 right-0 w-[50%] h-[50%] origin-[0%,100%] rotate-[60deg] skew-y-[-60deg]'>
                    <div spellcheck="false" className='bg-yellow-400  absolute left-[-100%] w-[200%] h-[200%] text-center block skew-y-[60deg] rotate-[15deg]' contentEditable="true">3</div>
                </li>
                <li className='overflow-hidden absolute top-0 right-0 w-[50%] h-[50%] origin-[0%,100%] rotate-[90deg] skew-y-[-60deg]'>
                    <div spellcheck="false" className='bg-violet-400  absolute left-[-100%] w-[200%] h-[200%] text-center block skew-y-[60deg] rotate-[15deg]' contentEditable="true">4</div>
                </li>
                <li className='overflow-hidden absolute top-0 right-0 w-[50%] h-[50%] origin-[0%,100%] rotate-[120deg] skew-y-[-60deg]'>
                    <div spellcheck="false" className='bg-orange-400  absolute left-[-100%] w-[200%] h-[200%] text-center block skew-y-[60deg] rotate-[15deg]' contentEditable="true">5</div>
                </li>
                <li className='overflow-hidden absolute top-0 right-0 w-[50%] h-[50%] origin-[0%,100%] rotate-[150deg] skew-y-[-60deg]'>
                    <div spellcheck="false" className='bg-yellow-400  absolute left-[-100%] w-[200%] h-[200%] text-center block skew-y-[60deg] rotate-[15deg]' contentEditable="true">6</div>
                </li>
                <li className='overflow-hidden absolute top-0 right-0 w-[50%] h-[50%] origin-[0%,100%] rotate-[180deg] skew-y-[-60deg]'>
                    <div spellcheck="false" className='bg-violet-400  absolute left-[-100%] w-[200%] h-[200%] text-center block skew-y-[60deg] rotate-[15deg]' contentEditable="true">7</div>
                </li>
                <li className='overflow-hidden absolute top-0 right-0 w-[50%] h-[50%] origin-[0%,100%] rotate-[210deg] skew-y-[-60deg]'>
                    <div spellcheck="false" className='bg-orange-400  absolute left-[-100%] w-[200%] h-[200%] text-center block skew-y-[60deg] rotate-[15deg]' contentEditable="true">8</div>
                </li>
                <li className='overflow-hidden absolute top-0 right-0 w-[50%] h-[50%] origin-[0%,100%] rotate-[240deg] skew-y-[-60deg]'>
                    <div spellcheck="false" className='bg-yellow-400  absolute left-[-100%] w-[200%] h-[200%] text-center block skew-y-[60deg] rotate-[15deg]' contentEditable="true">9</div>
                </li>
                <li className='overflow-hidden absolute top-0 right-0 w-[50%] h-[50%] origin-[0%,100%] rotate-[270deg] skew-y-[-60deg]'>
                    <div spellcheck="false" className='bg-violet-400  absolute left-[-100%] w-[200%] h-[200%] text-center block skew-y-[60deg] rotate-[15deg]' contentEditable="true">10</div>
                </li>
                <li className='overflow-hidden absolute top-0 right-0 w-[50%] h-[50%] origin-[0%,100%] rotate-[300deg] skew-y-[-60deg]'>
                    <div spellcheck="false" className='bg-orange-400  absolute left-[-100%] w-[200%] h-[200%] text-center block skew-y-[60deg] rotate-[15deg]' contentEditable="true">11</div>
                </li>
                <li className='overflow-hidden absolute top-0 right-0 w-[50%] h-[50%] origin-[0%,100%] rotate-[330deg] skew-y-[-60deg]'>
                    <div spellcheck="false" className='bg-yellow-400  absolute left-[-100%] w-[200%] h-[200%] text-center block skew-y-[60deg] rotate-[15deg]' contentEditable="true">12</div>
                </li>
            </ul>
        </div>
    );
}

export default Wheel;
