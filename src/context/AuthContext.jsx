import { useContext, useEffect } from "react";
import { createContext, useState } from "react";
import { registerRequest, verifyToken } from '../api/auth'
import { loginRequest, logOut} from "../api/auth";
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
    const [errors, setErrors] = useState([]);
    const notify = (message) => toast.success(message, { autoClose: 1500 });

    const signUp = async (user) => {
        try {
            const res = await registerRequest(user);
            notify('Successful registration!!');
            return res;
        } catch (error) {

            if (Array.isArray(error.response.data.message)) {
                setErrors(error.response.data.message)
            } else {
                setErrors([error.response.data.message])
            }
        }
    }
    const signIn = async (user) => {
        try {
            setLoading(true)
            const res = await loginRequest(user);
            setUser(res.data);
            setIsAuthenticated(true);
            notify('successful login');
            return res;
        } catch (error) {
            if (Array.isArray(error.response.data.message)) {
                setErrors(error.response.data.message);
            } else {
                setErrors([error.response.data.message]);
            }
        } finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        if (errors.length > 0) {
            setTimeout(() => {
                setErrors([]);
            }, 4000);
        }
    }, [errors])


    useEffect(() => {

        async function checkLogin() {
            try {
                const res = await verifyToken();
                setLoading(false);
                setIsAuthenticated(true)
                setUser(res.data);
            } catch (error) {
                setLoading(false);
                setIsAuthenticated(false);
                setUser(null);
            }
        }
        checkLogin();
    }, [])

    const clearSession = async () => {
        try {
            await logOut()
            setUser(null);
            setLoading(false);
            setIsAuthenticated(false);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <AuthContext.Provider value={{
            signUp,
            signIn,
            user,
            isAuthenticated,
            loading,
            errors,
            clearSession
        }}>
            {children}
        </AuthContext.Provider>
    )
}