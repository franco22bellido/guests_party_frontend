import axios from "./axios.config";


export const registerRequest = async (user) => {
    return await axios.post(`/auth/register`, user);
}
export const loginRequest = async (user) => {
    const res = await axios.post(`/auth/login`, user);
    return res;
}
export const verifyToken = async (token) => {
    return await axios.get(`/auth/verifytoken`, {
        headers: {
            Authorization: token
        }
    });
}
export const logOut = async () => await axios.delete(`/auth/logOut`)
