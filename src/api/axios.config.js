import axios from "axios";


const _instance = axios.create({
    baseURL: import.meta.env.VITE_API_ORIGIN,
})
_instance.interceptors.request.use(config => {
    const token = window.localStorage.getItem('Authorization');
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  }, error => {
    return Promise.reject(error);
  });
export default _instance;