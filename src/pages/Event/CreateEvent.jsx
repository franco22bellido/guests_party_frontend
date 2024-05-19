import { createEvent, getEvents } from '../../api/events.js'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import Button from '../../components/Buttons/Button.jsx';
import SectionContainer from '../../components/elements/SectionContainer.jsx';
import Form from '../../components/elements/Form.jsx';
import EventList from '../../components/Event/EventList.jsx';


const CreateEvent = () => {

  const notify = (message) => toast.success(message, { autoClose: 1500 });
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorsApi, setErrorsApi] = useState(null);
  const [events, setEvents] = useState(null);

  const onSubmit = handleSubmit(async data => {
    try {
      await createEvent(data);
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
      const res = await getEvents();
      setEvents(res.data);
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
          <EventList events={events} setEvents={setEvents}/>
        </SectionContainer>
    </>
  )
}

export default CreateEvent