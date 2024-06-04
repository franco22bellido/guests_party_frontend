import Card from "../elements/Card"
import Button from "../Buttons/Button"
import EventComponent from "./EventComponent"

const EventList = ({events=[], deleteEvent=()=>{}}) => {

  return (
    <>{
      events &&
      events.map((event, i) => (
        <Card key={i}>
          <EventComponent Event={event} />
          <Button
            onClick={() => { deleteEvent(event.id) }}
            className={'bg-red-600 w-full'}
            type={'button'}
          >Delete</Button>
        </Card>
      ))
    }</>
  )
}

export default EventList
