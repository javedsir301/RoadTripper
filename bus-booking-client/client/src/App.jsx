import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import BusList from './pages/BusList'
import Booking from './pages/Booking'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/bus' element={<BusList />}></Route>
        <Route path='/booking' element={<Booking />}></Route>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
