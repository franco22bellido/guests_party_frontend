import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useParams} from 'react-router-dom'
import {eventAndGuests} from '../../api/events.js'
import { useAuth } from '../../context/AuthContext'
import { useGuest } from '../../context/GuestContext.jsx'

//esta pagina deberia tener otro nombre
const Event = () => {
    let {eventId} = useParams();
    const {user} = useAuth();
    const [event, setEvent] = useState({});
    const [guestState, setGuest] = useState([]);
    const {deleteGuest} = useGuest();

    const getData = async (eventId)=> {
        const res = await eventAndGuests(eventId, user.token);
        setEvent(res.data);
        setGuest(res.data.guests)
    }

    useEffect(() => {
        getData(eventId);
    },[])

    
    return (
        <div>
            {
                guestState.map((guest, i)=> (
                    <div key={i}>
                        <h1>{guest.firstName}</h1>
                        <h1>{guest.lastName}</h1>
                        <Link to={`/re-generate/${guest.id}`}>generate invitation </Link>
                        <button onClick={async ()=> {await deleteGuest(guest.id); getData(eventId)}}>delete</button>
                        {/* una vez que se hace el delete no se llama al getData desde aca, lo mejor seria
                        que el guetContext se encargue de actualizar el estado de la lista,
                        agregar un state de guestsList*/}
                    </div>
                ))
            }

            <Link to={`/create-guest/${event.id}`}>generate new invitation</Link>
        </div>
    )
}

export default Event
