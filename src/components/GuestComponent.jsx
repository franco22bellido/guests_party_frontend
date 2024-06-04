const GuestComponent = ({ guest }) => {


    return (
        <>
            <p className="w-full text-center overflow-hidden overflow-ellipsis text-3xl">{guest?.firstName} {guest?.lastName}</p>
            <p className="font-semibold text-base">State: {guest?.state ? `Arrived` : `Not arrived`}</p>
            {guest?.event && guest?.user && (<>
                <p className="font text-xl text-center">event name: {guest.event?.eventName}</p>
                <p className="font text-xl">start date: {guest.event?.startDate}</p>
                <p className="font  text-xl">host username: {guest?.user.username}</p>
            </>)}
        </>
    )
}

export default GuestComponent