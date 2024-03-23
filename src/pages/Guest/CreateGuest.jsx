import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom';
import GuestComponent from '../../components/GuestComponent.jsx';
import QRCodeComponent from '../../components/QRCodeComponent.jsx';
import { useGuest } from '../../context/GuestContext'

const CreateGuest = () => {

  const { register, handleSubmit } = useForm();
  const { eventId } = useParams();
  const { data, setData, create } = useGuest();


  const onSubmit = handleSubmit(async (data) => {
    data.eventId = eventId;
    await create(data);
  })

  useEffect(() => {
    setData(null);
  }, [])
  return (
    <div className='container'>
      <form onSubmit={onSubmit} className="form col-md-6 mx-auto my-4">
        <label htmlFor="firstName" className="form-label">First name</label>
        <input type="text" className='form-control'
          {...register('firstName', { required: true })} />

        <label htmlFor="lastName" className="form-label">Last name</label>
        <input type="text" className='form-control'
          {...register('lastName', { required: true })} />
        <button type='submit' className='btn btn-success my-3'>craete invitation</button>
      </form>
      {
        data ?
          <div class="card row">
              <div className='card-img-top mt-3' style={{width: '64rem'}}><QRCodeComponent token={data?.token} /></div>
                <GuestComponent guest={data.guest} />
                <Link className='btn btn-primary col-md-2' to={`/event-guests/${data.guest.eventId}`}>Go to guests</Link>
          </div>
          :
          <h1></h1>
      }
    </div>
  )
}


export default CreateGuest

