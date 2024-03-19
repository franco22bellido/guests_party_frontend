import React from 'react'
import { useAuth } from './context/AuthContext'
import { Navigate, Outlet} from 'react-router-dom'; 

const ProtectedRoute = () => {
    const {loading ,user, isAuthenticated}  = useAuth();

    if(loading){
        return <div>loading...</div>
    }

    if(!isAuthenticated && !loading){
        return <Navigate to={'/login'} replace/>
    }
  return (
    <Outlet/>
  )
}

export default ProtectedRoute
