import React from 'react'
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'
import {useGuest} from '../context/GuestContext'
const SetGuestState = () => {

  const [searchParams]= useSearchParams();
  const {cambiarEstado} = useGuest();

  const seeter = async ()=> {
    const guestToken = searchParams.get('token');
    return await cambiarEstado(guestToken);
    
  }

  useEffect(()=> {
    seeter();
  }, [])

  return (
    <div>
      
    </div>
  )
}

export default SetGuestState
