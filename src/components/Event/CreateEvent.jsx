import React from 'react'
import { createEvent, getEvents, deleteEventAndGuests} from '../../api/events'
import { useAuth } from '../../context/AuthContext'
import { useForm } from 'react-hook-form';
import {Link} from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
import ModalDelete from '../ModalDeleteEvent';
import { toast } from 'react-toastify';


const CreateEvent = () => {

  const notify = (message) => toast.success(message, {autoClose: 1500});
  const { register, handleSubmit, formState: {errors}} = useForm();
  const [errorsApi, setErrorsApi] = useState(null);
  const { user } = useAuth();
  const [events, setEvents] = useState(null);
  const [eventIdSelected, setEventIdSelected] = useState();

  const onSubmit = handleSubmit(async data => {
    try {
      await createEvent(data, user.token);
      getEventsByUserId();
      notify('event saved!!');
    } catch (error) {
      if(Array.isArray(error.response.data.message)){
        setErrorsApi(error.response.data.message);
      }else {
        return setErrorsApi([error.response.data.message]);
      }
    }
  })

  const getEventsByUserId = async () => {
    try {
      const res = await getEvents(user.token);
      setEvents(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  const handleClickDelete = async (eventId) => {
    setEventIdSelected(eventId);
  }

  const deleteEvent= async ()=> {
    try {
      
      await deleteEventAndGuests(eventIdSelected ,user.token);
      await getEventsByUserId();
      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=> {
    if(errorsApi){
      setTimeout(() => {
        setErrorsApi(null);  
      }, 5000);
    
    }
  }, [errorsApi] )


  useEffect(() => {
    getEventsByUserId();
  }, [])
  
  
  return (
    <section className='container'>

      <ModalDelete deleteEvent={deleteEvent}/>

      <form onSubmit={onSubmit} className='col-md-6 mx-auto'>
      {
        errorsApi && 
        errorsApi.map((error, i)=> (
          <p className='alert alert-secondary' role={'alert'} key={i}>{error}</p> 
        ))
      }
        <label htmlFor="eventName" className="form-label">Event name</label>
        <input type="text"
          {...register('eventName', { required: true })} className='form-control' />
        {
          errors.eventName && (
            <p className="alert alert-danger mt-3" role="alert">
              Event name is required
            </p>
          )
          }


        <label htmlFor="startDate" className="form-label">Start Date</label>
        <input type="text"
          {...register('startDate', { required: true })} className='form-control' />
        {
          errors.startDate && 
          <p className="alert alert-danger mt-3" role={'alert'}>
            Start date is required
          </p>
        }
        <button type='submit' className='btn btn-primary'>save event</button>
      </form>
      <div className='row'>
      {
        events ?
          events.map((event, i) => (
            <div key={i} className='card col-md-3 mx-4 my-2'>
              <div className='card-body'>
              <h5 className="card-title">Event name:</h5>
               <p className="card-text">{event.eventName}</p>
              <h5 className="card-title">start date:</h5>
              <p className="card-text">{event.startDate}</p>
              <Link to={`/event-Guests/${event.id}`}>view guests</Link>
              
              <button type="button" 
              onClick={()=> {handleClickDelete(event.id)}}
              className="btn btn-danger ms-5" data-bs-toggle="modal" data-bs-target="#modalDelete">Delete</button>
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