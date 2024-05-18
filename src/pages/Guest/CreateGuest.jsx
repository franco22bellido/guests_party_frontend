import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom';
import GuestComponent from '../../components/GuestComponent.jsx';
import QRCodeComponent from '../../components/QRCodeComponent.jsx';
import { useGuest } from '../../context/GuestContext'

import Form from '../../components/elements/Form'
import Main from '../../components/elements/Main'
import SectionContainer from '../../components/elements/SectionContainer'
import Button from '../../components/Buttons/Button.jsx';
import Card from '../../components/elements/Card.jsx';




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
    <Main>
      <SectionContainer className={'justify-center'}>
      
      <Form onSubmit={onSubmit} className="form col-md-6 mx-auto my-4">
        {
          errorGuests && 
          errorGuests.map((error, i)=> (
            <p key={i} className="alert alert-danger mb-2">{error}</p>
          ))
        }

        <label htmlFor="firstName" className="">First name</label>
        <input type="text" className='border py-1'
          {...register('firstName', { required: true })} />


        {
          errors.firstName &&
          (
            <p className='alert alert-danger mt-3' role="alert">first name is required</p>
          )
        }
        <label htmlFor="lastName" className="form-label">Last name</label>
        <input type="text" className='border py-1'
          {...register('lastName', { required: true })} />
        {
          errors.lastName &&
          (
            <p className='alert alert-danger mt-3' role="alert">last name is required</p>
          )
        }
        <Button className={'bg-slate-900 mt-4 w-1/2 mx-auto'}>Create invitation</Button>
        <Link className='text-blue-700' to={`/event-guests/${eventId}`}>Go to guests</Link>
      </Form>
      
      </SectionContainer>
      <SectionContainer className={'justify-center'}>
      {
        data &&
        <Card className={'max-w-96 p-0'}>
                <GuestComponent guest={data.guest} />
                <QRCodeComponent token={data?.token} />
          </Card>
      }
      </SectionContainer>
   </Main>

  )
}


export default CreateGuest

