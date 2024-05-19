import axios from "./axios.config";

export const createGuest = async (data)=> {
    return await axios.post(`/guests`, data);
}

export const regenerateToken = async (guestId)=> {
    return await axios.get(`/guests/regenerate/${guestId}`);
}
export const seeInvitation = async (guestToken)=> {
    return await axios.get(`/guests/${guestToken}`);
}

export const setState = async (guestToken)=> {
    return await axios.put(`/guests/${guestToken}`);
}
export const deleteOne = async (guestId)=> {
    return await axios.delete(`/guests/${guestId}`);
}

export const setStateById = async (guestId)=> {
    return await axios.put(`/guests/setStateById/${guestId}`)
}

// opciones crud, findone✔= seeInvitation || regenerateToken.
//findAll lo hace cuando veo un evento.
//delete y update