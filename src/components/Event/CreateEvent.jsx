import React from 'react'
import { createEvent } from '../../api/events'
import { useAuth } from '../../context/AuthContext'
import {useForm} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const CreateEvent = () => {
  const {register, handleSubmit} = useForm();
  const {user} = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async data => {
    await createEvent(data, user.token);
    return navigate('/home');
  })

  return (
    <div className='col-md-6 mx-auto '>
      <form onSubmit={onSubmit}>
        <label htmlFor="eventName" className="form-label">Event name</label>
        <input type="text"
        {...register('eventName', {required: true})} className='form-control'/>

        <label htmlFor="startDate" className="form-label">Start Date</label>
        <input type="text" 
        {...register('startDate', {required: true})} className='form-control'/>
        <button type='submit' className='btn btn-primary'>save event</button>
      </form>

      
    </div>
  )
}

export default CreateEvent