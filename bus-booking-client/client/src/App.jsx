import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import BusList from './pages/BusList'
import Booking from './pages/Booking'
import Payment from './pages/Payment'
import ProfilePage from './pages/ProfilePage'
import TicketPage from './pages/e-Ticket'

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
        <Route path='/profile' element={<ProfilePage/>}></Route>
        <Route path='/ticket' element={<TicketPage/>}></Route>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
