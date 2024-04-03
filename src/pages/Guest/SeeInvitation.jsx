import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react';
import {Link} from 'react-router-dom';
import { useGuest } from '../../context/GuestContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import GuestComponent from '../../components/GuestComponent.jsx';

const SeeInvitation = () => {
    
    
    const [searchParams] =  useSearchParams();
    const {data, seeInvitationGuest, setStateGuest,loading, setLoading, errorGuests} = useGuest();;
    const {user, isAuthenticated} = useAuth();
    
    const markArrival = async ()=> {
        await setStateGuest(searchParams.get('token'));
        return seeInvitationGuest(searchParams.get('token'));
     
    }
    const seeInvitation  = async ()=> {
        await seeInvitationGuest(searchParams.get('token'));
    }

    useEffect(()=> {
       setLoading(true);
       seeInvitation();
    }, [])
  return (
    <div className='container'>
      {
        loading === false &&
        <div className='card mt-3'>
          <GuestComponent guest={data.guest}/>

          {
            //este codigo es el que autoriza la entrada
            user?.data.id === data?.guest.userId ? 
            <button className='btn btn-success col-md-2 ms-2 mb-2' onClick={()=> markArrival()}>authorize entry</button>
            : <Link className='btn btn-primary col-md-2 ms-2 mb-2' to={'/login'}>login</Link>
          }
        </div>
      }
      {
        errorGuests &&
        (
          <div className='col-md-6 mx-auto'>
            {
              errorGuests.map((error, i)=> (
                <p className='alert alert-danger mt-4' key={i}>{error}</p>
              ))
            }
          {
            //este codigo te devuelve a home dependiendo de tu sesión
            isAuthenticated &&
              <Link className='btn btn-primary col-md-2 ms-2 mb-2' to={'/home'}>Go home</Link>
            
          }
          </div>
        )
      }
      
     
      
    </div>
  )
}

export default SeeInvitation

