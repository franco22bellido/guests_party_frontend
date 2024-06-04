import Loader from './components/Loader';
import { useAuth } from './context/AuthContext'
import { Navigate, Outlet} from 'react-router-dom'; 

const ProtectedRoute = () => {
    const {loading , isAuthenticated}  = useAuth();

    if(loading){
      return <div className='h-[300px] flex justify-center items-center'><Loader loading={loading}/></div>
    }

    if(!isAuthenticated && !loading){
      return <Navigate to={'/login'} replace/>
    }
  return (
    <Outlet/>
  )
}

export default ProtectedRoute