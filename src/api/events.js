import axios from "axios";

const API = "http://localhost:3000/events";

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