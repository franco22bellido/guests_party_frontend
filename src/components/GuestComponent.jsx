import React from 'react'

const GuestComponent = ({guest, token}) => {


    return (
        <div className='card-body'>
            <h5>First name:</h5>
            <p>{guest?.firstName}</p>
            <h5>Last name:</h5>
            <p> {guest?.lastName}</p>
            {
                guest?.state ?
                    <h5>State: Arrived</h5>
                    : <h5>State: Not arrived</h5>
            }
            <h5>event name:</h5>
            <p>{guest?.event.eventName}</p>
            <h5>start date:</h5>
            <p>{guest?.event.startDate}</p>
            <h5>host username:</h5>
            <p>{guest?.user.username}</p>
            
        </div>
    )
}

export default GuestComponent