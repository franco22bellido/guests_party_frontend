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

    const deleteAndGetData = async (guestId)=> {
        await deleteGuest(guestId);
        getData(eventId)
    }

    useEffect(() => {
        getData(eventId);
    },[])

    
    return (
        <div>
            <Link to={`/create-guest/${event.id}`}>create new invitation</Link>
            {
                guestState.map((guest, i)=> (
                    <div key={i}>
                        <h1>{guest.firstName}</h1>
                        <h1>{guest.lastName}</h1>
                        <Link to={`/re-generate/${guest.id}`}>generate invitation </Link>
                        <button onClick={()=> {deleteAndGetData(guest.id)}}>delete</button>
                    </div>
                ))
            }

        </div>
    )
}

export default Event
