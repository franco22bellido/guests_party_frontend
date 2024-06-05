import { useState } from "react";
import { createContext, useContext } from "react";
import { createGuest, deleteOne, regenerateToken, seeInvitation, setArrival } from "../api/guests";
import { useEffect } from "react";
import useToastNotify from "../components/useToastNotify";

export const GuestContext = createContext();

export const useGuest = () => {
    const context = useContext(GuestContext);
    if (!context) {
        throw new Error('useGuest must be use within a guestProvider');
    }
    return context;
}

export const GuestProvider = ({ children }) => {

    const { createNotification } = useToastNotify()
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorGuests, setErrorGuests] = useState([]);



    const create = async (data) => {
        try {
            setLoading(true)
            const res = await createGuest(data);
            console.log(res)
            setLoading(false)
            setData(res.data);
            createNotification('Guest saved susefully!');
        } catch (error) {
            const message = error.response.data.message
            if (Array.isArray(message)) {
                setErrorGuests(message);
            } else {
                setErrorGuests([message]);
            }
        }
    }
    const getGuestById = async (guestId) => {
        try {
            setLoading(true)
            const res = await regenerateToken(guestId);
            setData(res.data);
            return setLoading(false);
        } catch (error) {
            console.log(error)
            const message = error.response.data.message
            if (Array.isArray(message)) {
                setErrorGuests(message);
            } else {
                setErrorGuests([message]);
            }
        }
    }
    const getGuestByToken = async (guestToken) => {
        try {
            setLoading(true)
            const res = await seeInvitation(guestToken);
            setData({ ...res.data, token: guestToken })
            setLoading(false);
            return res.data;
        } catch (error) {
            const message = error.response.data.message
            if (Array.isArray(message)) {
                setErrorGuests(message)
            } else {
                setErrorGuests([message])
            }
        }
    }
    const markArrival = async () => {
        await setArrival(data.token)
        data.guest.state = !data.guest.state
        setData({ ...data })
    }

    const deleteGuest = async (guestId) => {
        try {
            setLoading(true)
            await deleteOne(guestId);
            setLoading(false)
        } catch (error) {
            const message = error.response.data.message
            if (Array.isArray(message)) {
                setErrorGuests(message);
            } else {
                setErrorGuests([message]);
            }
        }
    }


    useEffect(() => {
        if (errorGuests) {
            setTimeout(() => {
                setErrorGuests([]);
            }, 6500);
        }
    }, [errorGuests])

    return (
        <GuestContext.Provider value={{
            data, setData, create, getGuestById, getGuestByToken,
            deleteGuest, loading, setLoading,
            errorGuests, setErrorGuests, markArrival
        }}>
            {children}
        </GuestContext.Provider>
    )
}