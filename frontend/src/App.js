import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Login from './components/Login'
import Signup from './components/Signup'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
