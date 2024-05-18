import axios from "./axios.config";

export const createGuest = async (data, token)=> {
    return await axios.post(`/guests`, data, {
        headers: {
            Authorization: token
        }
    });
}

export const regenerateToken = async (guestId , token)=> {
    return await axios.get(`/guests/regenerate/${guestId}`, {
        headers: {
            Authorization: token
        }
    });
}
export const seeInvitation = async (guestToken)=> {
    return await axios.get(`/guests/${guestToken}`);
}

export const setState = async (guestToken, userToken)=> {
    return await axios.put(`/guests/${guestToken}`, {}, {
        headers: {
            Authorization: userToken
        }
    });
}
export const deleteOne = async (guestId, userToken)=> {
    return await axios.delete(`/guests/${guestId}`, {
        headers: {
            Authorization: userToken
        }
    });
}

export const setStateById = async (guestId, userToken)=> {
    return await axios.put(`/guests/setStateById/${guestId}`, {}, {
        headers: {Authorization: userToken}
    })
}

// opciones crud, findone✔= seeInvitation || regenerateToken.
//findAll lo hace cuando veo un evento.
//delete y update