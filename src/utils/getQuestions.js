import axios from "axios";

export default async function getQuestions(query) {
    const { data } = await axios.get(`https://opentdb.com/api.php?amount=10${query}`);
    console.log(data)
    return data.results;

}