import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react';
import {Link} from 'react-router-dom';
import { useGuest } from '../../context/GuestContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

const SeeInvitation = () => {
    
    
    const [searchParams] = useSearchParams();
    const {guest, seeInvitationGuest} = useGuest();;
    const {user} = useAuth();
    

    useEffect(()=> {
       seeInvitationGuest(searchParams.get('token'));
    }, [])
  return (
    <div>
      <h1>first name: {guest?.firstName}</h1>
      <h1>last name: {guest?.lastName}</h1>
      {
        guest?.state ?
        <h1>state: arrived</h1>
        : <h1>state: not arrived</h1>
      }

      <h2>event name: {guest?.event.eventName}</h2>
      <h2>start date: {guest?.event.startDate}</h2>

      <h2>host username: {guest?.user.username}</h2>

      {
        //esto esta mal, el authorize entry solo debe aparecer si el guest es nuestro
        user ? 
        //aca tendria que ir la url de verificación, aca y solo aca
        //http://localhost:5173/set-state/?token=
        <Link to={`${window.location.origin}/set-state/?token=${searchParams.get('token')}`}>authorize entry</Link>
        : <Link>Login</Link>
      }
    
      
    </div>
  )
}

export default SeeInvitation

