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

    const [guest, setGuest] = useState(null);
    const { user } = useAuth();

    const create = async (data) => {
        try {
            const res = await createGuest(data, user.token);
            setGuest(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    const regenerateTokenGuest = async (guestId) => {
        try {
            const res = await regenerateToken(guestId, user.token);
            setGuest(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    const seeInvitationGuest = async (guestToken) => {
        try {
            const res = await seeInvitation(guestToken);
            setGuest(res.data)

        } catch (error) {
            
        }
    }
    const cambiarEstado = async (guestToken)=> {
        try {
            const res = await setState(guestToken, user.token);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }
    const deleteGuest = async (guestId)=> {
        try {
            const res = await deleteOne(guestId, user.token);
            console.log(res);
        } catch (error) {
            console.log(error); 
        }
    }



    return (
        <GuestContext.Provider value={{
            guest, setGuest, create, regenerateTokenGuest, seeInvitationGuest,cambiarEstado,
            deleteGuest
        }}>
            {children}
        </GuestContext.Provider>
    )
}