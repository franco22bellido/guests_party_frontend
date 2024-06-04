import { Link, useParams } from 'react-router-dom'
import Button from '../../components/Buttons/Button.jsx'
import SectionContainer from '../../components/elements/SectionContainer.jsx'
import GuestList from '../../components/GuestList.jsx'
import Loader from '../../components/Loader'
import UseGuestsList from './hooks/UseGuestsList.jsx'

const GuestsPage = () => {
    let { eventId } = useParams();
    const { guests, setGuests, event } = UseGuestsList(eventId)


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
            <Loader/>
            <SectionContainer>
                <GuestList Guests={guests} setGuests={setGuests} />
            </SectionContainer>
        </>
    )
}

export default GuestsPage

