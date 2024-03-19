import React, { useEffect } from 'react'
import { useState } from 'react';
import { useAuth } from '../context/AuthContext'

const Error = () => {

    const { errors } = useAuth();

    const cargarErrores = async ()=> {
        const timer = setTimeout(()=> {
            setErrorState(null);
        }, 5000)
        clearTimeout(timer);
    }
    useEffect(()=> {
        cargarErrores();
    }, [errors])

    return (
        <div>
            {
                errorState ? 
                <h1>{errors}</h1>
                : <h1>no hay errores</h1>
            }
        </div>
    )
}

export default Error
