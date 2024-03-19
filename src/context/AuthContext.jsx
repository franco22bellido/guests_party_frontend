import { useContext, useEffect } from "react";
import { createContext, useState } from "react";
import {registerRequest, verifyToken} from '../api/auth'
import { loginRequest } from "../api/auth";
import Cookies  from 'js-cookie'


export const AuthContext = createContext();

export const useAuth = ()=> {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used withon a AuthProvider");
    }
    return context;
}

export const AuthProvider = ({children})=> {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors]  = useState([]);
    

    const signUp = async (user) => {
        try {
            const res  = await registerRequest(user);
            return res;
        } catch (error) {
            console.log(error)
        }
    }
    const signIn = async (user)=> {
        try {
            const res = await loginRequest(user);
            setUser(res.data);
            setIsAuthenticated(true);
            Cookies.set('token', res.data.token);
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=> {
        
        async function checkLogin (){
            const cookies = Cookies.get();
        if(!cookies.token) {
            setIsAuthenticated(false);
            setUser(null);
            setLoading(false);
        }
            try {
                //revisar, el token si es invalido igual responde un res.data
                const res = await verifyToken(cookies.token);
                if(!res.data){
                    setLoading(false);
                    return setIsAuthenticated(false);
                }
                
                setLoading(false);
                setIsAuthenticated(true)
                setUser({data : res.data, 
                         token :  cookies.token});
            } catch (error) {
                setLoading(false);
                setIsAuthenticated(false);
                setUser(null);
            }
        
        }
        checkLogin();    
    }, [] )

 
 
    return ( 
        <AuthContext.Provider value={{
            signUp,
            signIn,
            user,
            isAuthenticated, 
            loading,
            errors
        }}>
            {children}
        </AuthContext.Provider>
    )
}