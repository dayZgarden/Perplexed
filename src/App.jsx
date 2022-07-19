import React from "react"
import axios from "axios"
import Landing from './pages/Landing'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Results from "./pages/Results"

function App() {

  return (

    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element = {<Landing/>}/>
          <Route path='/results' element={<Results/>}/>
        </Routes>
      </Router>

    </div>
  )
}

export default App
