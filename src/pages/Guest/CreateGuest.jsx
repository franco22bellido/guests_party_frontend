import React, { useEffect } from 'react'
import {useForm} from 'react-hook-form'
import { useParams } from 'react-router-dom';
import Guest from '../../components/Guest.jsx';
import {useGuest} from '../../context/GuestContext'

const CreateGuest = () => {

  const {register, handleSubmit} = useForm();
  const {eventId} = useParams();
  const {guest, setGuest,create} = useGuest();
  

  const onSubmit = handleSubmit(async (data)=> {
      data.eventId = eventId;
      await create(data);
  })

  useEffect(()=> {
    setGuest(null);
  }, [] )
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text"
        {...register('firstName', {required: true})}/>
        <input type="text" 
        {...register('lastName', {required: true})}/>
        <button type='submit'>craete invitation</button>
      </form>
      {
        //una vez craedo se genera una invitación
        guest ? 
        <Guest data={guest}/> :
        <h1></h1>
      }
    </div>
  )
}


export default CreateGuest