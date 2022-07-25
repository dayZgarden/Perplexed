import React from 'react'
import axios from "axios"
import { useEffect, useState} from 'react'


export default function Home() {

    const [results, setResults] = useState([]);

    async function getQuestions() {
        const {data} = await axios.get('https://opentdb.com/api.php?amount=10&category=15&difficulty=medium&type=multiple')
        console.log(data)
        setResults(data)
    }

    useEffect(() => {
        getQuestions();
    }, [])

    console.log(results)

  return (
    <div>
        {
            results.map((e) => {
                e.question;
            })
        }
    </div>
  )
}
