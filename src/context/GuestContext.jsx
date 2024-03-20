import { useState } from "react";
import { createContext, useContext } from "react";
import { useAuth } from "./AuthContext";
import { createGuest, deleteOne, regenerateToken, seeInvitation, setState } from "../api/guests";

export const GuestContext = createContext();

export const useGuest = () => {
    const context = useContext(GuestContext);
    if (!context) {
        throw new Error('useGuest must be use within a guestProvider');
    }
    return context;
}

export const GuestProvider = ({ children }) => {

    const [data, setData] = useState(null);
    const [loading,  setLoading] = useState(true);
    const { user } = useAuth();

    const create = async (data) => {
        try {
            const res = await createGuest(data, user.token);
            setData(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    const regenerateTokenGuest = async (guestId) => {
        try {
            const res = await regenerateToken(guestId, user.token);
            setData(res.data);
            return setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }
    const seeInvitationGuest = async (guestToken) => {
        try {
            const res = await seeInvitation(guestToken);
            setData(res.data)
            setLoading(false);
            return res.data;
        } catch (error) {
            return error.response
            // console.log(error);
        }
    }
    const setStateGuest = async (guestToken)=> {
        try {
            await setState(guestToken, user.token);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteGuest = async (guestId)=> {
        try {
            await deleteOne(guestId, user.token);
        } catch (error) {
            console.log(error); 
        }
    }



    return (
        <GuestContext.Provider value={{
            data, setData, create, regenerateTokenGuest, seeInvitationGuest,setStateGuest,
            deleteGuest, loading, setLoading
        }}>
            {children}
        </GuestContext.Provider>
    )
}