import { useContext, useEffect } from "react";
import { createContext, useState } from "react";
import { registerRequest, verifyToken } from '../api/auth'
import { loginRequest } from "../api/auth";
import Cookies from 'js-cookie'
import { toast } from "react-toastify";


export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used withon a AuthProvider");
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [errorAuth, setErrorAuth] = useState(null);
    const notify = (message) => toast.success(message, { autoClose: 1500 });

    const signUp = async (user) => {
        try {
            const res = await registerRequest(user);
            notify('Successful registration!!');
            return res;
        } catch (error) {

            if (Array.isArray(error.response.data.message)) {
                setErrorAuth(error.response.data.message)
            } else {
                setErrorAuth([error.response.data.message])
            }
        }
    }
    const signIn = async (user) => {
        try {
            const res = await loginRequest(user);
            setUser(res.data);
            setIsAuthenticated(true);
            notify('successful login');
            return res;
        } catch (error) {
            if (Array.isArray(error.response.data.message)) {
                setErrorAuth(error.response.data.message);
            } else {
                setErrorAuth([error.response.data.message]);
            }
        }
    }


    useEffect(() => {
        if (errorAuth) {
            setTimeout(() => {
                setErrorAuth(null);
            }, 4000);
        }
    }, [errorAuth])


    useEffect(() => {

        async function checkLogin() {
            const cookies = Cookies.get();
            if (!cookies.token) {
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
            }
            try {
                //revisar, el token si es invalido igual responde un res.data
                const res = await verifyToken(cookies.token);
                if (!res.data) {
                    setLoading(false);
                    return setIsAuthenticated(false);
                }

                setLoading(false);
                setIsAuthenticated(true)
                setUser({
                    data: res.data,
                    token: cookies.token
                });
            } catch (error) {
                setLoading(false);
                setIsAuthenticated(false);
                setUser(null);
            }

        }
        checkLogin();
    }, [])

    const logOut = async () => {
        const cookies = Cookies.get();
        if (cookies.token) {
            Cookies.remove('token');
            setUser(null);
            setLoading(false);
            setIsAuthenticated(false);
        }
    }

    return (
        <AuthContext.Provider value={{
            signUp,
            signIn,
            user,
            isAuthenticated,
            loading,
            errorAuth,
            logOut
        }}>
            {children}
        </AuthContext.Provider>
    )
}