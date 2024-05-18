import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { eventAndGuests } from '../../api/events.js'
import { useAuth } from '../../context/AuthContext'
import { useGuest } from '../../context/GuestContext.jsx'
import { setStateById } from '../../api/guests.js'
import Button from '../../components/Buttons/Button.jsx'
import Main from '../../components/elements/Main.jsx'
import Card from '../../components/elements/Card.jsx'
import SectionContainer from '../../components/elements/SectionContainer'


//esta pagina deberia tener otro nombre
const Event = () => {
    let { eventId } = useParams();
    const { user } = useAuth();
    const [event, setEvent] = useState({});
    const [guestState, setGuest] = useState([]);
    const { deleteGuest } = useGuest();

    const getData = async (eventId) => {
        const res = await eventAndGuests(eventId, user.token);
        setEvent(res.data);
        setGuest(res.data.guests)
    }

    const deleteAndGetData = async (guestId) => {
        await deleteGuest(guestId);
        getData(eventId)
    }
    const markArrival = async (guestId) => {
        await setStateById(guestId, user.token);
        return await getData(eventId);
    }

    useEffect(() => {
        getData(eventId);
    }, [])


    return (
        <Main>
            <SectionContainer className={'justify-center'}>
                <h2 className='text-4xl font-semibold text-center w-full'>{event.eventName}</h2>
                <Link className='' to={`/create-guest/${event.id}`}>
                    <Button className={'w-full bg-green-900 px-2 py-1 my-5 '}>
                        create new invitation
                    </Button>
                </Link>
            </SectionContainer>
            <SectionContainer>
                    {
                        guestState.map((guest, i) => (
                            <Card key={i}>
                                <h5 className='text-lg font-semibold'>Firstname:</h5>
                                <p className='text-lg'>{guest.firstName}</p>
                                <h5 className='text-lg font-semibold'>Lastname</h5>
                                <p className='text-lg'>{guest.lastName}</p>
                                <h5 className='text-lg font-semibold'>State:</h5>
                                {
                                    guest.state === true ?
                                        <p className="text-lg">Arrived</p>
                                        : <p className="text-lg">Not arrived</p>
                                }
                                <Link to={`/re-generate/${guest.id}`} className="text-blue-600 text-lg">generate invitation</Link>
                                <Button className='bg-red-700 w-full' onClick={() => { deleteAndGetData(guest.id) }}>Delete</Button>
                                <Button className='bg-blue-500 w-full' onClick={() => markArrival(guest.id)}>Change state</Button>
                            </Card>
                        ))
                    }
            </SectionContainer>
        </Main>
    )
}

export default Event

