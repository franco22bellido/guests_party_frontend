import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom';
import GuestComponent from '../../components/GuestComponent.jsx';
import QRCodeComponent from '../../components/QRCodeComponent.jsx';
import { useGuest } from '../../context/GuestContext'

const CreateGuest = () => {

  const { register, handleSubmit,formState: {errors} } = useForm();
  const { eventId } = useParams();
  const { data, setData, create, errorGuests } = useGuest();


  const onSubmit = handleSubmit(async (data) => {
    data.eventId = parseInt(eventId);
    await create(data);
  })

  useEffect(() => {
    setData(null);
  }, [])
  return (
    <div className='container'>
      <form onSubmit={onSubmit} className="form col-md-6 mx-auto my-4">
        {
          errorGuests && 
          errorGuests.map((error, i)=> (
            <p key={i} className="alert alert-danger mb-2">{error}</p>
          ))
        }

        <label htmlFor="firstName" className="form-label">First name</label>
        <input type="text" className='form-control'
          {...register('firstName', { required: true })} />


        {
          errors.firstName &&
          (
            <p className='alert alert-danger mt-3' role="alert">first name is required</p>
          )
        }
        <label htmlFor="lastName" className="form-label">Last name</label>
        <input type="text" className='form-control'
          {...register('lastName', { required: true })} />
        {
          errors.lastName &&
          (
            <p className='alert alert-danger mt-3' role="alert">last name is required</p>
          )
        }
        <button type='submit' className='btn btn-success my-3'>craete invitation</button>
      </form>
      {
        data &&
          <div className="card row">
              <div className='card-img-top mt-3' style={{width: '64rem'}}><QRCodeComponent token={data?.token} /></div>
                <GuestComponent guest={data.guest} />
                <Link className='btn btn-primary col-md-2' to={`/event-guests/${data.guest.eventId}`}>Go to guests</Link>
          </div>
      }
    </div>
  )
}


export default CreateGuest

