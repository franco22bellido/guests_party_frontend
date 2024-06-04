import axios from "./axios.config";

export const getEvents = async ()=> {
    return await axios.get('/events');
}
export const createEvent = async (data)=> {
    return await axios.post('/events',data );
}
export const getGuestsByEventId = async (eventId)=> {
    return await axios.get(`/events/EventAndGuests/${eventId}`);
}

export const deleteEventAndGuests = async (eventId)=> {
    return await axios.delete(`/events/${eventId}`);
}