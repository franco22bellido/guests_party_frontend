import React from 'react'
import { createEvent, getEvents } from '../../api/events'
import { useAuth } from '../../context/AuthContext'
import { useForm } from 'react-hook-form';
import {Link} from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';

const CreateEvent = () => {
  const { register, handleSubmit } = useForm();
  const { user } = useAuth();
  const [events, setEvents] = useState(null);
  

  const onSubmit = handleSubmit(async data => {
    await createEvent(data, user.token);
    getEventsByUserId();
  })
  const getEventsByUserId = async () => {
    try {
      const res = await getEvents(user.token);
      setEvents(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getEventsByUserId();
  }, [])

  return (
    <section className='container'>
      <form onSubmit={onSubmit} className='col-md-6 mx-auto'>
        <label htmlFor="eventName" className="form-label">Event name</label>
        <input type="text"
          {...register('eventName', { required: true })} className='form-control' />

        <label htmlFor="startDate" className="form-label">Start Date</label>
        <input type="text"
          {...register('startDate', { required: true })} className='form-control' />
        <button type='submit' className='btn btn-primary'>save event</button>
      </form>
      
      <div className='row'>
      {
        events ?
          events.map((event, i) => (
            <div className='card col-md-3 mx-4 my-2'>
              <div className='card-body'>
              <h5 class="card-title">Event name:</h5>
               <p class="card-text">{event.eventName}</p>
              <h5 class="card-title">start date:</h5>
              <p class="card-text">{event.startDate}</p>
              <Link to={`/event-Guests/${event.id}`}>view guests</Link>
              </div>
            </div>
          ))
          : <h5>no hay eventos</h5>
      }
      </div>
    </section>
  )
}

export default CreateEvent