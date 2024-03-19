import axios from 'axios'

const API = 'http://localhost:3000'


export const registerRequest = async (user)=> {
    return await axios.post(`${API}/auth/register`, user);
}
export const loginRequest = async (user)=> {
    return await axios.post(`${API}/auth/login`, user);
}
export const verifyToken = async (token)=> {
    return await axios.get(`${API}/auth/verifytoken`, {
        headers: {
            Authorization: token
        }
    });
}