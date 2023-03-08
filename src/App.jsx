import React from "react"
import axios from "axios"
import Landing from './pages/Landing'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Results from "./pages/Results"
import Genres from "./pages/Genres"
import Register from "./pages/Register"
import Options from "./pages/Options"
import Leaderboards from "./pages/Leaderboards"
import Wheel from "./pages/Wheel"

function App() {

  return (

    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element = {<Register/>} />
          <Route path='/options' element = {<Options/>}/>
          <Route path='/genres' element = {<Genres/>}/>
          <Route path='/landing' element = {<Landing/>}/>
          <Route path='/results' element={<Results/>}/>
          <Route path='/leaderboards' element={<Leaderboards/>}/>
          <Route path='/wheel' element={<Wheel />} />
        </Routes>
      </Router>

    </div>
  )
}

export default App
