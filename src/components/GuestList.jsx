import { Link } from "react-router-dom"
import Card from "./elements/Card"
import { useGuest } from "../context/GuestContext";
import { setStateById } from '../api/guests.js'
import Button from "./Buttons/Button.jsx";
import GuestComponent from "./GuestComponent.jsx";

const GuestList = ({Guests=[], setGuests=()=>{}}) => {
    const { deleteGuest } = useGuest();

    const deleteAndGetData = async (guestId) => {
        await deleteGuest(guestId);
        setGuests(Guests.filter((guest)=> guest.id !== guestId))
    }

    const markArrival = async (guestId) => {
        await setStateById(guestId);
        setGuests(Guests.map((guest)=> {
            if(guest.id === guestId) {
                guest.state = !guest.state;
                return guest;
            }
            return guest;
        }))
    }
  return (
    <>
    {
        Guests.map((guest, i) => (
            <Card key={i}>
                <GuestComponent guest={guest}/>
                <Link to={`/re-generate/${guest.id}`} className="text-blue-600 text-lg">generate invitation</Link>
                <Button className='bg-red-700 w-full' onClick={() => { deleteAndGetData(guest.id) }}>Delete</Button>
                <Button className='bg-blue-500 w-full' onClick={() => markArrival(guest.id)}>Change state</Button>
            </Card>
        ))
    }
    </>
  )
}

export default GuestList


