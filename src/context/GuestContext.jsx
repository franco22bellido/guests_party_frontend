import { useState } from "react";
import { createContext, useContext } from "react";
import { useAuth } from "./AuthContext";
import { createGuest, deleteOne, regenerateToken, seeInvitation, setState, setStateById } from "../api/guests";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const GuestContext = createContext();

export const useGuest = () => {
    const context = useContext(GuestContext);
    if (!context) {
        throw new Error('useGuest must be use within a guestProvider');
    }
    return context;
}

export const GuestProvider = ({ children }) => {

    const notify = (message) => toast.success(message, {autoClose: 1500});
    const [data, setData] = useState(null);
    const [loading,  setLoading] = useState(true);
    const { user } = useAuth();
    const [errorGuests, setErrorGuests] =  useState([]);



    const create = async (data) => {
        try {
            const res = await createGuest(data, user.token);
            setData(res.data);
            notify('Guest saved susefully!');
        } catch (error) {
            const message = error.response.data.message
            if(Array.isArray(message)){
                setErrorGuests(message);
            }else {
                setErrorGuests([message]);
            }
        }
    }
    const regenerateTokenGuest = async (guestId) => {
        try {
            const res = await regenerateToken(guestId);
            setData(res.data);
            return setLoading(false);
        } catch (error) {
            const message = error.response.data.message
            if(Array.isArray(message)){
                setErrorGuests(message);
            }else {
                setErrorGuests([message]);
            }
        }
    }
    const seeInvitationGuest = async (guestToken) => {
        try {
            const res = await seeInvitation(guestToken);
            setData({...res.data, token: guestToken})
            setLoading(false);
            return res.data;
        } catch (error) {
            const message = error.response.data.message
            if(Array.isArray(message)){
                setErrorGuests(message)
            }else {
                setErrorGuests([message])
            }
        }
    }
    const setStateGuest = async (guestToken)=> {
        try {
            await setState(guestToken);
        } catch (error) {
            const message = error.response.data.message
            if(Array.isArray(message)){
                setErrorGuests(message);
            }else {
                setErrorGuests([message]);
            }
        }
    }
    const markArrival = async ()=> {
        await setState(data.token)
        data.guest.state = !data.guest.state
        setData({...data})
    }

    const deleteGuest = async (guestId)=> {
        try {
            await deleteOne(guestId);
        } catch (error) {
            const message = error.response.data.message
            if(Array.isArray(message)){
                setErrorGuests(message);
            }else {
                setErrorGuests([message]);
            }
        }
    }


    useEffect(()=> {
        if(errorGuests){
            setTimeout(() => {
                setErrorGuests([]);
            }, 6500);
        }
    } , [errorGuests])

    return (
        <GuestContext.Provider value={{
            data, setData, create, regenerateTokenGuest, seeInvitationGuest,setStateGuest,
            deleteGuest, loading, setLoading,
            errorGuests, setErrorGuests, markArrival
        }}>
            {children}
        </GuestContext.Provider>
    )
}