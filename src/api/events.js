import axios from "./axios.config";

export const getEvents = async (token)=> {
    return await axios.get('/events', {
        headers: {
            Authorization: token
        }
    });
}
export const createEvent = async (data, token)=> {
    return await axios.post('/events',data, {
        headers: {
            Authorization: token
        }
    });
}
export const eventAndGuests = async (eventId, token)=> {
    return await axios.get(`/events/EventAndGuests/${eventId}`, {
        headers: {
            Authorization: token
        }
    });
}

export const deleteEventAndGuests = async (eventId, userToken)=> {
    return await axios.delete(`/events/${eventId}`, {
        headers : {
            Authorization: userToken
        }
    });
}