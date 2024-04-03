import axios from "axios";

const API = "http://192.168.0.2:3000/events";

export const getEvents = async (token)=> {
    return await axios.get(API, {
        headers: {
            Authorization: token
        }
    });
}
export const createEvent = async (data, token)=> {
    return await axios.post(`${API}`,data, {
        headers: {
            Authorization: token
        }
    });
}
export const eventAndGuests = async (eventId, token)=> {
    return await axios.get(`${API}/EventAndGuests/${eventId}`, {
        headers: {
            Authorization: token
        }
    });
}

export const deleteEventAndGuests = async (eventId, userToken)=> {
    return await axios.delete(`${API}/${eventId}`, {
        headers : {
            Authorization: userToken
        }
    });
}