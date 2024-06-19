import axios from "axios";


const _instance = axios.create({
    baseURL: import.meta.env.VITE_API_ORIGIN,
    withCredentials: true
})
export default _instance;