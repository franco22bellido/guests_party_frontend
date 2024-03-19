import React from 'react'
import { createEvent } from '../../api/events'
import { useAuth } from '../../context/AuthContext'
import {useForm} from 'react-hook-form';

const CreateEvent = () => {
    const {register, handleSubmit} = useForm();
  const {user} = useAuth();


  const onSubmit = handleSubmit(async data => {
    const res = await createEvent(data, user.token);
    console.log(res);
  })

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text"
        {...register('eventName', {required: true})} />
        <input type="text" 
        {...register('startDate', {required: true})} />
        <button type='submit'>save event</button>
      </form>
    </div>
  )
}

export default CreateEvent