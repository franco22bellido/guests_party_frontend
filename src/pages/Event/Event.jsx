import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { eventAndGuests } from '../../api/events.js'
import { useAuth } from '../../context/AuthContext'
import { useGuest } from '../../context/GuestContext.jsx'
import {setStateById} from '../../api/guests.js'


//esta pagina deberia tener otro nombre
const Event = () => {
    let { eventId } = useParams();
    const { user } = useAuth();
    const [event, setEvent] = useState({});
    const [guestState, setGuest] = useState([]);
    const { deleteGuest} = useGuest();

    const getData = async (eventId) => {
        const res = await eventAndGuests(eventId, user.token);
        setEvent(res.data);
        setGuest(res.data.guests)
    }

    const deleteAndGetData = async (guestId) => {
        await deleteGuest(guestId);
        getData(eventId)
    }
    const markArrival = async (guestId)=> {
        await setStateById(guestId, user.token);
        return await getData(eventId);
    }

    useEffect(() => {
        getData(eventId);
    }, [])


    return (
        <div className='container'>
            <h2 className='col-md-4 mx-auto'>{event.eventName}</h2>

            <Link className='btn btn-primary my-3 mx-2' to={`/create-guest/${event.id}`}>create new invitation</Link>

            <div className='row'>
                {
                    guestState.map((guest, i) => (
                        <div key={i} className="card col-md-3 mx-3">
                            <div className='card-body'>
                                <h5 className='card-title'>First name:</h5>
                                <p className='card-text'>{guest.firstName}</p>
                                <h5 className='card-title'>Last name</h5>
                                <p className='card-text'>{guest.lastName}</p>
                                <h5 className='card-title'>State:</h5>
                                {
                                    guest.state === true ? 
                                    <p className="card-text">Arrived</p>
                                    : <p className="card-text">Not arrived</p>
                                }
                                <Link to={`/re-generate/${guest.id}`} className="btn btn-success">generate invitation</Link>
                                <button className='btn btn-danger my-2' onClick={() => { deleteAndGetData(guest.id) }}>Delete</button>
                                <button className='btn btn-primary' onClick={() => markArrival(guest.id)}>Change state</button>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default Event

