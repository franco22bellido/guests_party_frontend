import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import QRCode from 'react-qr-code';
import { useParams } from 'react-router-dom';
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
    <div>
      <form onSubmit={onSubmit}>
        <input type="text"
          {...register('firstName', { required: true })} />
        <input type="text"
          {...register('lastName', { required: true })} />
        <button type='submit'>craete invitation</button>
      </form>
      {
        //una vez craedo se genera una invitación
        data ?
          <div>
            <GuestComponent guest={data.guest} />
            <QRCodeComponent token = {data?.token}/>
          </div>
          :
          <h1></h1>
      }
    </div>
  )
}


export default CreateGuest