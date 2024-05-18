const GuestComponent = ({ guest, token }) => {


    return (
        <>
        <div className="flex flex-col items-center">
            <p className="text-3xl">{guest?.firstName} {guest?.lastName}</p>
            {
                guest?.state ?
                    <h5>State: Arrived</h5>
                    : <h5>State: Not arrived</h5>
            }
            <p className="font text-xl">event name: {guest?.event.eventName}</p>
            <h5 className="font text-xl">start date: {guest?.event.startDate}</h5>
            <h5 className="font  text-xl">host username: {guest?.user.username}</h5>
        </div>
        </>
    )
}

export default GuestComponent