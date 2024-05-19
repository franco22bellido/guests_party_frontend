import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { eventAndGuests } from '../../api/events.js'
import Button from '../../components/Buttons/Button.jsx'
import SectionContainer from '../../components/elements/SectionContainer'
import GuestList from '../../components/GuestList.jsx'

const Event = () => {
    let { eventId } = useParams();
    const [event, setEvent] = useState({});
    const [guests, setGuests] = useState([]);


    const getData = async (eventId) => {
        const res = await eventAndGuests(eventId);
        setEvent(res.data);
        setGuests(res.data.guests)
    }

    useEffect(() => {
        getData(eventId);
    }, [])


    return (
        <>
            <SectionContainer className={'justify-center'}>
                <h1 className='text-4xl font-semibold text-center w-full'>{event.eventName}</h1>
                <h3 className='text-3xl font-medium text-center w-full'>{event.startDate}</h3>
                <Link className='' to={`/create-guest/${event.id}`}>
                    <Button className={'w-full bg-green-900 px-2 py-1 my-5 '}>
                        create new invitation
                    </Button>
                </Link>
            </SectionContainer>
            <SectionContainer>
                <GuestList Guests={guests} setGuests={setGuests}/>
            </SectionContainer>
        </>
    )
}

export default Event

