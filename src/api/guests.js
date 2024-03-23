import axios from "axios";

const API = "http://localhost:3000/guests"

export const createGuest = async (data, token)=> {
    return await axios.post(`${API}`, data, {
        headers: {
            Authorization: token
        }
    });
}

export const regenerateToken = async (guestId , token)=> {
    return await axios.get(`${API}/regenerate/${guestId}`, {
        headers: {
            Authorization: token
        }
    });
}
export const seeInvitation = async (guestToken)=> {
    return await axios.get(`${API}/${guestToken}`);
}

export const setState = async (guestToken, userToken)=> {
    return await axios.put(`${API}/${guestToken}`, {}, {
        headers: {
            Authorization: userToken
        }
    });
}
export const deleteOne = async (guestId, userToken)=> {
    return await axios.delete(`${API}/${guestId}`, {
        headers: {
            Authorization: userToken
        }
    });
}

export const setStateById = async (guestId, userToken)=> {
    return await axios.put(`${API}/setStateById/${guestId}`, {}, {
        headers: {Authorization: userToken}
    })
}

// opciones crud, findone✔= seeInvitation || regenerateToken.
//findAll lo hace cuando veo un evento.
//delete y update