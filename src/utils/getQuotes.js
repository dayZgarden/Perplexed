import axios from "axios";

export default async function getQuotes() {
    const { data } = await axios.get('https://api.adviceslip.com/advice')
    console.log(data.slip.advice)
    return (data.slip.advice)
}