import { createEvent, getEvents, deleteEventAndGuests } from '../../api/events'
import { useAuth } from '../../context/AuthContext'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import Button from '../Buttons/Button';
import SectionContainer from '../elements/SectionContainer';
import Form from '../elements/Form';
import Card from '../elements/Card';


const CreateEvent = () => {

  const notify = (message) => toast.success(message, { autoClose: 1500 });
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorsApi, setErrorsApi] = useState(null);
  const { user } = useAuth();
  const [events, setEvents] = useState(null);

  const onSubmit = handleSubmit(async data => {
    try {
      await createEvent(data, user.token);
      getEventsByUserId();
      notify('event saved!!');
    } catch (error) {
      if (Array.isArray(error.response.data.message)) {
        setErrorsApi(error.response.data.message);
      } else {
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
  const deleteEvent = async (eventId) => {
    try {
      await deleteEventAndGuests(eventId);
      await getEventsByUserId();

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (errorsApi) {
      setTimeout(() => {
        setErrorsApi(null);
      }, 5000);

    }
  }, [errorsApi])


  useEffect(() => {
    getEventsByUserId();
  }, [])


  return (
    <>
        <SectionContainer>
          {/* <ModalDelete deleteEvent={deleteEvent}/> */}
          <Form onSubmit={onSubmit}>
            {
              errorsApi &&
              errorsApi.map((error, i) => (
                <p className='' role={'alert'} key={i}>{error}</p>
              ))
            }
            <label htmlFor="eventName" className="">Event name</label>
            <input type="text"
              {...register('eventName', { required: true })} className='border' />
            {
              errors.eventName && (
                <p className="alert alert-danger mt-3" role="alert">
                  Event name is required
                </p>
              )
            }


            <label htmlFor="startDate" className="form-label">Start Date</label>
            <input type="text"
              {...register('startDate', { required: true })} className='border' />
            {
              errors.startDate &&
              <p className="alert alert-danger mt-3" role={'alert'}>
                Start date is required
              </p>
            }
            <Button className={'bg-blue-500 mx-auto w-1/2'}>save event</Button>
          </Form>
        </SectionContainer>

        <SectionContainer className={'justify-center'}>
          {
            events ?
              events.map((event, i) => (
                <Card key={i}>


                  <h5 className="text-lg font-semibold">Event name:</h5>
                  <p className="card-text">{event.eventName}</p>
                  <h5 className="text-lg font-semibold">start date:</h5>
                  <p className="card-text">{event.startDate}</p>
                  <Link to={`/event-Guests/${event.id}`} className='text-blue-600'>view guests</Link>

                  <Button
                    onClick={() => { deleteEvent(event.id) }}
                    className={'bg-red-600 w-full'}
                    type={'button'}
                  >Delete</Button>
                </Card>
              ))
              : <h5>no hay eventos</h5>
          }
        </SectionContainer>
    </>
  )
}

export default CreateEvent