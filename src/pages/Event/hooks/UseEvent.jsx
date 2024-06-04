import { useEffect, useState } from "react"
import { createEvent, deleteEventAndGuests, getEvents } from "../../../api/events";
import useToastNotify from "../../../components/useToastNotify";

const UseEvent = () => {

  const [events, setEvents] = useState([]);
  const { createNotification } = useToastNotify()
  const [errorsApi, setErrorsApi] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMyEvents = async () => {
    setLoading(true)
    const res = await getEvents();
    setLoading(false)
    setEvents(res.data);
  }
  const addEvent = async (values) => {
    try {
      setLoading(true)
      await createEvent(values);
      setLoading(false)
      createNotification('event added!')
      getMyEvents()
    } catch (error) {
      if (Array.isArray(error.response.data.message)) {
        setErrorsApi(error.response.data.message);
      } else {
        return setErrorsApi([error.response.data.message]);
      }
    } finally{
      setLoading(false)
    }
  }
  const deleteEvent = async (eventId) => {
    setLoading(true)
    await deleteEventAndGuests(eventId);
    setLoading(false)
    setEvents(events.filter((event) => event.id !== eventId))
  }

  useEffect(() => {
    getMyEvents()
  }, [])

  useEffect(() => {
    if (errorsApi) {
      setTimeout(() => {
        setErrorsApi(null);
      }, 5000);

    }
  }, [errorsApi])


  return { events, setEvents, addEvent, errorsApi, deleteEvent, loading }
}

export default UseEvent
