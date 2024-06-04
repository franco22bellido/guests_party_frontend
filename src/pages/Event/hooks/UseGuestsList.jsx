import { useEffect, useState } from "react"
import { getGuestsByEventId } from '../../../api/events.js'
import { useGuest } from "../../../context/GuestContext.jsx";

const UseGuestsList = (eventId) => {
  const [guests, setGuests] = useState([]);
  const [event, setEvent] = useState({})
  const {setLoading } =useGuest()

  const getGuests = async () => {
    setLoading(true)
    const { data } = await getGuestsByEventId(eventId)
    setLoading(false)
    setEvent(data)
    setGuests(data.guests)
  }
  useEffect(() => {
    getGuests()
  }, [])
  return { guests, setGuests, event}
}

export default UseGuestsList
