import React, { useState } from 'react'
import { useEffect} from 'react'
import { Link } from 'react-router-dom'
import {getEvents} from '../api/events.js'
import { useAuth } from '../context/AuthContext'


const HomePage = () => {
  const {user} = useAuth();
  const [events, setEvents] = useState([]);

  const getData = async ()=> {
    try {
      const res = await getEvents(user.token);
      setEvents(res.data);
      
    } catch (error) {
      console.log(error);
    }
    }    

  useEffect(()=> {
    getData();
  }, [] )

  return (
    <div>
       {

        events.length > 0 ?
            events.map((event, i)=> (
              //esto deberia ser un componente
                <div key={i}>
                    {event.id}
                    {event.eventName}
                    {event.startDate}
                    <Link to={`/event-Guests/${event.id}`}>view guests</Link>
                </div>
            ))
          
          : <h1>Aqui aun no hay eventos</h1>
       
       }
       
    </div>

  )
}


export default HomePage