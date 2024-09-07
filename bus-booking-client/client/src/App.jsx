import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import BusList from './pages/BusList'
import Booking from './pages/Booking'
import Payment from './pages/Payment'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/bus' element={<BusList />}></Route>
        <Route path='/booking' element={<Booking />}></Route>
        <Route path='/payment' element={<Payment />}></Route>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
