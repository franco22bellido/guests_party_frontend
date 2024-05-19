import { Link } from "react-router-dom"

const EventComponent = ({ Event = {} }) => {
  return (
    <>
      <h5 className="text-lg font-semibold">Event name:</h5>
      <p className="card-text">{Event.eventName}</p>
      <h5 className="text-lg font-semibold">start date:</h5>
      <p className="card-text">{Event.startDate}</p>
      <Link to={`/event-Guests/${Event.id}`} className='text-blue-600'>view guests</Link>
  </>
  )
}

export default EventComponent
