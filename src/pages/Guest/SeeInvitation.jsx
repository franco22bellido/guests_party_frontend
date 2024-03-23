import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect } from 'react';
import {Link} from 'react-router-dom';
import { useGuest } from '../../context/GuestContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import GuestComponent from '../../components/GuestComponent.jsx';

const SeeInvitation = () => {
    
    
    const [searchParams] =  useSearchParams();
    const {data, seeInvitationGuest, setStateGuest,loading, setLoading} = useGuest();;
    const navigate = useNavigate();
    const {user} = useAuth();
    
    const markArrival = async ()=> {
        await setStateGuest(searchParams.get('token'));
        return seeInvitationGuest(searchParams.get('token'));
     
    }
    const seeInvitation  = async ()=> {
      const data = await seeInvitationGuest(searchParams.get('token'));
      if(data.status === 401){
        navigate("/login");
      }
    }

    useEffect(()=> {
       setLoading(true);
       seeInvitation();
    }, [])
  return (
    <div className='container'>
      {
        loading === false ?
        <div className='card mt-3'>
          <GuestComponent guest={data.guest}/>
          {
            //este codigo es el que autoriza la entrada
            user?.data.id === data?.guest.userId ? 
            <button className='btn btn-success col-md-2 ms-2 mb-2' onClick={()=> markArrival()}>authorize entry</button>
            : <Link className='btn btn-primary col-md-2 ms-2 mb-2' to={'/login'}>Login</Link>
          }
        </div>
        : <h1>loading...</h1>
      
      }

      
     
      
    </div>
  )
}

export default SeeInvitation

