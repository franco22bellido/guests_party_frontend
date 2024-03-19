import React, { useEffect } from 'react'
import {useForm} from 'react-hook-form'
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {

    const {register, handleSubmit} = useForm();
    const {signUp, isAuthenticated} = useAuth();
    const navigate = useNavigate();

    
    useEffect(()=> {
        if(isAuthenticated){
            navigate('/home');
        }
    }, [isAuthenticated]);


    const onSubmit = handleSubmit(async (values)=> {
        signUp(values);
    });


  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" 
            {...register('username', {required: true})}
        />
        <input type="email"
        {...register('email', {required: true})} />
        <input type="password" 
        {...register('password', {required: true})} />
        <button type='submit'>register</button>
      </form>
      <p>Do you already have an account?</p>
      <Link to={'/login'}>Login</Link>
    </div>
  )
}

export default RegisterPage
