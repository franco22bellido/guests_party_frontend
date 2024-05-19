import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './ProtectedRoute'
import CreateEvent from './pages/Event/CreateEvent'
import CreateGuest from './pages/Guest/CreateGuest'
import Regenerate from './pages/Regenerate'
import SeeInvitation from './pages/Guest/SeeInvitation'
import { GuestProvider } from './context/GuestContext'
import ScanQrComponent from './components/ScanQrComponent'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import AutoLogin from './components/AutoLogin'
import Main from './components/elements/Main'
import GuestsPage from './pages/Event/GuestsPage'

function App() {

  return (

    <AuthProvider>
      <GuestProvider>
        <Main>
          <BrowserRouter>
            <ToastContainer theme={"colored"} />
            <Routes>
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/test/:usertest' element={<AutoLogin />} />

              {/* use this endpoint senting the query ?token=aodkaspo */}
              <Route path="/see-invitation/" exact element={<SeeInvitation />} />
              {/* ver una invitación por su token */}


              <Route element={<ProtectedRoute />}>
                <Route path='/scanQr' element={<ScanQrComponent />} />
                <Route path='/' element={<CreateEvent />} />
                {/* mis eventos */}
                <Route path='/event-Guests/:eventId' element={<GuestsPage />} />
                {/* un evento y sus invitados */}
                <Route path='/create-guest/:eventId' element={<CreateGuest />} />
                {/* crear un invitado */}
                <Route path='/re-generate/:guestId' element={<Regenerate />} />
                {/* ver una invitación nuevamente basandonos en su id */}
              </Route>

            </Routes>
          </BrowserRouter>
        </Main>
      </GuestProvider>
    </AuthProvider>
  )
}

export default App