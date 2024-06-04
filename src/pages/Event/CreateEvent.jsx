import { useForm } from 'react-hook-form';
import Button from '../../components/Buttons/Button.jsx';
import SectionContainer from '../../components/elements/SectionContainer.jsx';
import Form from '../../components/elements/Form.jsx';
import EventList from '../../components/Event/EventList.jsx';
import UseEvent from './hooks/UseEvent.jsx';
import Loader from '../../components/Loader.jsx';
import Errors from '../../components/Errors/Errors.jsx';


const CreateEvent = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { events, addEvent, errorsApi, deleteEvent, loading } = UseEvent()

  const onSubmit = handleSubmit(async values => {
    await addEvent(values)
  })

  return (
    <>
      <SectionContainer>
        <Form onSubmit={onSubmit}>
          <Errors errors={errorsApi} />
          <label htmlFor="eventName" className="">Event name</label>
          <input type="text"
            {...register('eventName', { required: true })} className='border' />
          {
            errors.eventName && (
              <p className="text-red-600" role="alert">
                Event name is required
              </p>
            )
          }
          <label htmlFor="" className="">Event location</label>
          <input type="text"
            {...register('eventLocation', { required: true })} className='border' />
          {
            errors.eventLocation && (
              <p className="text-red-600" role="alert">
                Event location is required
              </p>
            )
          }

          <label htmlFor="startDate" className="form-label">Start Date</label>
          <input type="date"
            {...register('startDate', { required: true })} className='border' />
          {
            errors.startDate &&
            <p className="text-red-600" role="alert">
              Start date is required
            </p>
          }
          <Button className={'bg-blue-500 mx-auto w-1/2'}>save event</Button>
        </Form>
      </SectionContainer>
      <Loader loading={loading} />
      <SectionContainer className={'justify-center'}>
        <EventList events={events} deleteEvent={deleteEvent} />
      </SectionContainer>
    </>
  )
}

export default CreateEvent