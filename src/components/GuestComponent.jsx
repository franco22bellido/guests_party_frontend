import React from 'react'

const GuestComponent = ({guest}) => {


    return (
        <div>

            <h1>first name: {guest?.firstName}</h1>
            <h1>last name: {guest?.lastName}</h1>
            {
                guest?.state ?
                    <h1>state: arrived</h1>
                    : <h1>state: not arrived</h1>
            }

            <h2>event name: {guest?.event.eventName}</h2>
            <h2>start date: {guest?.event.startDate}</h2>

            <h2>host username: {guest?.user.username}</h2>



        </div>
    )
}

export default GuestComponent