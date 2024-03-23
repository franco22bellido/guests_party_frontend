import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './ProtectedRoute'
import CreateEvent from './components/Event/CreateEvent'
import Event from './pages/Event/Event'
import CreateGuest from './pages/Guest/CreateGuest'
import Regenerate from './pages/Regenerate'
import SeeInvitation from './pages/Guest/SeeInvitation'
import { GuestProvider } from './context/GuestContext'
import Navbar from './components/Navbar'
import ScanQrComponent from './components/ScanQrComponent'

function App() {

  return (
    <AuthProvider>
      <GuestProvider>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/scanQr' element={<ScanQrComponent/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>

        {/* use this endpoint senting the query ?token=aodkaspo */}
        <Route path="/see-invitation/" exact element={<SeeInvitation/>} />

       <Route element={<ProtectedRoute/>}>
        <Route path='/home' element={<CreateEvent/>}/>
        <Route path='/event-Guests/:eventId' element={<Event/>}/>
        <Route path='/create-guest/:eventId' element={<CreateGuest/>}/>
        <Route path='/re-generate/:guestId' element={<Regenerate/>}/>
        
       </Route>

      </Routes>
      </BrowserRouter>
      </GuestProvider>
    </AuthProvider>
  )
}

export default App